import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal'; // Import the modal component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('https://server-production-5951.up.railway.app/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
      <h1>Product List</h1>
      <button onClick={handleClick}>Add New Product</button>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - PKR{product.price}
          </li>
        ))}
      </ul>

    </div>
    <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddProduct={handleAddProduct}
      />
    </>
    
  );
};

export default ProductList;
