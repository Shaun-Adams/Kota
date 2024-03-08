import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
// import img from '../assets/burger.png';

interface FoodItem {
  id: number;
  item: string;
  quantity: number;
}

interface Column {
  key: 'icon' | 'item' | 'status'; // Explicitly define the possible keys
  label: string;
}

interface Row {
  key: number;
  // icon: JSX.Element;
  item: string;
  status: string;
}

const FoodItemTable: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

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

  const relevantItems = foodItems.filter(item => item.quantity === 0 || (item.quantity > 0 && item.quantity <= 6));

  const columns: Column[] = [
    { key: 'icon', label: 'Icon' },
    { key: 'item', label: 'Item Name' },
    { key: 'status', label: 'Quantity Status' },
  ];

  const rows: Row[] = relevantItems.map(item => ({
    key: item.id,
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
            {columns.map(column => (
              <TableCell key={column.key}>
                { 
                 column.key === 'item' ? item.item :
                 item.status}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default FoodItemTable;
