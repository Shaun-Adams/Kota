import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import axios from 'axios';

interface FoodItem {
  id?: number;
  item: string;
  description: string;
  quantity: number;
}

export default function ModalComponent({ onAddFoodItem, foodItem }: { onAddFoodItem: any, foodItem?: FoodItem }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newFoodItem, setNewFoodItem] = useState<FoodItem>({ item: '', description: '', quantity: 0 });

  // Load the existing food item into the state when editing
  useEffect(() => {
    if (foodItem) {
      setNewFoodItem(foodItem);
    }
  }, [foodItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFoodItem({ ...newFoodItem, [name]: name === 'quantity' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async () => {
    if (newFoodItem.item.trim() === '') {
      alert('Name cannot be blank');
      return;
    }

    const method = newFoodItem.id ? 'put' : 'post';
    const url = newFoodItem.id ? `${apiUrl}/api/go/foodItems/${newFoodItem.id}` : `${apiUrl}/api/go/foodItems`;

    try {
      const response = await axios[method](url, newFoodItem);
      onAddFoodItem(response.data); // Use the callback to update the parent component
      setNewFoodItem({ item: '', description: '', quantity: 0 }); // Reset form
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error submitting food item:', error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        {foodItem ? 'Edit Item' : 'Add New'}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewFoodItem({ item: '', description: '', quantity: 0 }); // Reset form when closing
        }}
        closeButton
      >
        <ModalContent>
          <ModalHeader>{foodItem ? 'Edit Food Item' : 'Add Food Item'}</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Item"
              placeholder="Enter item name"
              value={newFoodItem.item}
              onChange={handleInputChange}
              name="item"
            />
            <Input
              label="Description"
              placeholder="Enter description"
              value={newFoodItem.description}
              onChange={handleInputChange}
              name="description"
            />
            <Input
              label="Quantity"
              placeholder="Enter quantity"
              type="number"
              value={newFoodItem.quantity.toString()}
              onChange={handleInputChange}
              name="quantity"
            />
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
