import React, { useState } from 'react';
import axios from 'axios';

const ProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, price, description };
      const { data } = await axios.post('https://server-production-5951.up.railway.app/api/products', newProduct);
      onAddProduct(data);
      onClose(); // Close the modal after successful submission
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form
        style={{ display: 'flex', flexDirection: 'column',
        width: '300px', margin: '0 auto',
        alignItems: 'center'
         }}
        onSubmit={handleSubmit}>
          <label style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
                alignItems: 'center'
            }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
                alignItems: 'center'
            }}>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <br />
            <label style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
                alignItems: 'center'
            }}>
                Description:
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>

          <br />
          <br />
          <button type="submit">Add Product</button>
          <br />
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
