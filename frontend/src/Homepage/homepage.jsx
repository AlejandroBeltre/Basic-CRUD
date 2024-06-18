import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import './homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  const [products, setProducts] = useState([
    {
        id: 1,
        name: "Acme Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        stock: 50,
      },
      {
        id: 2,
        name: "Acme Smart Lamp",
        description: "Adjustable smart lamp with voice control",
        price: 49.99,
        stock: 25,
      },
      {
        id: 3,
        name: "Acme Fitness Tracker",
        description: "Sleek and durable fitness tracker with heart rate monitoring",
        price: 79.99,
        stock: 30,
      },
      {
        id: 4,
        name: "Acme Portable Charger",
        description: "High-capacity portable charger with fast charging",
        price: 29.99,
        stock: 75,
      },
  ]);
  const [users, setUsers] = useState([
    {
        id: 1,
        name: "JohnDoe",
        email: "john.doe@example.com",
        role: "Admin",
      },
      {
        id: 2,
        name: "JaneSmith",
        email: "jane.smith@example.com",
        role: "User",
      },
      {
        id: 3,
        name: "AliceJohnson",
        email: "alice.johnson@example.com",
        role: "User",
      },
      {
        id: 4,
        name: "BobBrown",
        email: "bob.brown@example.com",
        role: "Moderator",
      },
  ]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleProductSearch = (e) => {
    setProductSearchTerm(e.target.value);
  };

  const handleUserSearch = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const handleEditProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setNotification("Product has been deleted.");
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleEditUser = (id) => {
    navigate(`/edituser/${id}`);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setNotification("User has been deleted.");
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <div className='button-container'>
                <li ><Link to="/createproduct"><button>Create Product</button></Link></li>
                <li ><Link to="/createuser"><button>Create User</button></Link></li>
                <li ><Link to="/signin"><button>Sign in</button></Link></li>
            </div>
          </ul>
        </nav>
      </header>
      <main>
        {notification && <div className="notification">{notification}</div>}
        <h2>Product Management</h2>
        <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
                type="text" 
                placeholder="Search products..." 
                value={productSearchTerm}
                onChange={handleProductSearch}
            />
        </div>
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>   
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className='button-container'>
                  <Link to={`/editproduct/${product.id}`}><button>Edit</button></Link>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className='tables-headers'>User Management</h2>
        <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
                type="text" 
                placeholder="Search users..." 
                value={userSearchTerm}
                onChange={handleUserSearch}
            />
        </div>
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='button-container'>
                  <Link to={`/edituser/${user.id}`}><button>Edit</button></Link>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default HomePage;