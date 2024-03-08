import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import img from '../assets/burger.png';

interface FoodItem {
  id: number;
  item: string;
  quantity: number;
}

const FoodItemTable: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  // Fetch all foodItems
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/go/foodItems`);
        setFoodItems(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const relevantItems = foodItems.filter(item => item.quantity === 0 || (item.quantity > 0 && item.quantity <= 6));

  const columns = [
    { key: 'icon', label: 'Icon' },
    { key: 'item', label: 'Item Name' },
    { key: 'status', label: 'Quantity Status' },
  ];

  const rows = relevantItems.map(item => ({
    key: item.id,
    icon: <img className="w-10 h-10" src={img.src} alt="Burger" />,
    item: item.item,
    status: item.quantity === 0 ? 'Out of Stock' : 'Low on Stock',
  }));

  return (
    <Table aria-label="Food items table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default FoodItemTable;