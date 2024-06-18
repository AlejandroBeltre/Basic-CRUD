import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../Create/createproduct.css';

function EditProduct({ products, updateProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products ? products.find((p) => p.id === parseInt(id)) : null;

  const [productName, setProductName] = useState(product ? product.name : '');
  const [productDescription, setProductDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [stock, setStock] = useState(product ? product.stock : '');

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      updateProduct({
        id: product.id,
        name: productName,
        description: productDescription,
        price: price,
        stock: stock
      });
      navigate('/');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="create-product-container">
      <h1>Edit Product</h1>
      <p>Update the form to edit the product</p>
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
        <button type="submit">Update Product</button>
      </form>
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
    </div>
  );
}

export default EditProduct;