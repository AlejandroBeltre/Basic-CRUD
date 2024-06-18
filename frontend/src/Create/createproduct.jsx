import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './createproduct.css';

function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productName,
      productDescription,
      price,
      stock,
    });
  };

  return (
    <div className="create-product-container">
      <h1>Create Product</h1>
      <p>Fill out the form to add a new product</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product description"
          />
        </div>
        <div className="flex-container">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
          </div>
        </div>
        <button type="submit">Create Product</button>
      </form>
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
    </div>
  );
}

export default CreateProduct;