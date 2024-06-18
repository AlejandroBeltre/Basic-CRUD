import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getProductById, updateProduct } from '../api';
import '../Create/createproduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    getProductById(id)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        setProductName(productData.name);
        setProductDescription(productData.description);
        setPrice(productData.price);
        setStock(productData.stock);
      })
      .catch(error => console.error("Error fetching product by ID:", error));
  }, [id]);

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
      updateProduct(product.productId, {
        name: productName,
        description: productDescription,
        price: price,
        stock: stock
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error("Error updating product:", error));
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