import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import img from '../assets/burger.png';

interface FoodItem {
  id: number;
  item: string;
  description: string;
  quantity: number;
}

interface CardInterfaceProps {
  backendName: string;
}

const CardInterface: React.FC<CardInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  // Fetch all foodItems
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/${backendName}/foodItems`, {
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
  }, [backendName, apiUrl]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {foodItems.map((item) => (
        <Card key={item.id} shadow="sm" isPressable>
          <CardBody className="pt-3">
            <div className="relative flex flex-col items-center">
              {/* <Image className="w-10 h-10" src={img.src} alt="Burger" /> */}
                <div>
                  <b>{item.item}</b>
                </div>
                <div>
                  <b>{item.quantity}</b>
                </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default CardInterface;
