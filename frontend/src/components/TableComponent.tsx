import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import {columns} from "./data";

import axios from 'axios';
import ModalComponent from './ModalComponent';

interface FoodItem {
  id: number;
  item: string;
  description: string;
  quantity: number;
}

const INITIAL_VISIBLE_COLUMNS = ["id", "item", "description", "quantity", "actions"];

function TableComponent() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "quantity",
    direction: "ascending",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  // Fetch all foodItems
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/go/foodItems`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodItems(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const addFoodItem = (newItem: FoodItem) => {
    setFoodItems(prevItems => [...prevItems, newItem].reverse());
  };

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredFoodItems = [...foodItems];

    if (hasSearchFilter) {
      filteredFoodItems = filteredFoodItems.filter((foodItem) =>
        foodItem.item.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredFoodItems;
  }, [foodItems, filterValue]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: FoodItem, b: FoodItem) => {
      const first = a[sortDescriptor.column as keyof FoodItem] as number;
      const second = b[sortDescriptor.column as keyof FoodItem] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

 
  const deleteFoodItem = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/go/foodItems/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoodItems(currentItems => currentItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete food item', error);
    }
  };

  

  const renderCell = React.useCallback((foodItem: FoodItem, columnKey: React.Key) => {
    const cellValue = foodItem[columnKey as keyof FoodItem];

    switch (columnKey) {
      case "item":
        return (
            <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
    case "quantity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                {/* <DropdownItem onEdit={() => { setEditingFoodItem(foodItem); setIsModalOpen(true); }}>Edit</DropdownItem> */}
                <DropdownItem onClick={() => deleteFoodItem(foodItem.id)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <ModalComponent onAddFoodItem={addFoodItem} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {foodItems.length} Items</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    INITIAL_VISIBLE_COLUMNS,
    onSearchChange,
    onRowsPerPageChange,
    foodItems.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="danger"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" onPress={onPreviousPage} className="bg-gradient-to-r from-yellow-300 to-yellow-500 backdrop-filter backdrop-blur-md text-black px-4 py-2 rounded-lg">
          Previous
        </Button>
        <Button isDisabled={pages === 1} size="sm" onPress={onNextPage} color='danger'>
          Next
        </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
  <div className="table-container w-full">
    <Table
    aria-label="Example table with custom cells, pagination and sorting"
    isStriped
    isHeaderSticky
    bottomContent={bottomContent}
    bottomContentPlacement="outside"
    classNames={{
      wrapper: "max-h-[calc(5*4rem)]",
    }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No items found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}

export default TableComponent;
