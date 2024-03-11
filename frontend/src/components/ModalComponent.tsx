import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import axios from 'axios';

interface FoodItem {
  id: number;
  item: string;
  description: string;
  quantity: number;
}

export default function ModalComponent({ onAddFoodItem }: { onAddFoodItem: (foodItem: FoodItem) => void }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newFoodItem, setNewFoodItem] = useState({ item: '', description: '', quantity: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFoodItem({ ...newFoodItem, [name]: name === 'quantity' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async () => {
    if (newFoodItem.item.trim() === '') {
      alert('Name cannot be blank');
      return;
    }

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error("JWT token is not available.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/go/foodItems`, 
        newFoodItem, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        }
      );

      onAddFoodItem(response.data); 
      setNewFoodItem({ item: '', description: '', quantity: 0 }); 
      onClose(); 
    } catch (error) {
      console.error('Error adding new food item:', error);
      alert('Failed to add food item. Please try again.');
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Add New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeButton>
        <ModalContent>
          <ModalHeader>Add a New Food Item</ModalHeader>
          <ModalBody>
            <Input autoFocus label="Item" placeholder="Enter item name" value={newFoodItem.item} onChange={handleInputChange} name="item" />
            <Input label="Description" placeholder="Enter description" value={newFoodItem.description} onChange={handleInputChange} name="description" />
            <Input label="Quantity" placeholder="Enter quantity" type="number" value={newFoodItem.quantity.toString()} onChange={handleInputChange} name="quantity" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={handleSubmit} className="bg-gradient-to-r from-yellow-300 to-yellow-500 backdrop-filter backdrop-blur-md text-black px-4 py-2 rounded-lg">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
