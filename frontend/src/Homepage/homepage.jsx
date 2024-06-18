import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import './homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getProducts, getProductById, deleteProduct, getUsers, getUserById, deleteUser } from '../api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const userRefs = useRef({});

  useEffect(() => {
    // Get the user's role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    getProducts()
      .then(response => {
        console.log("Products fetched:", response.data);
        setProducts(response.data);
      })
      .catch(error => console.error("Error fetching products:", error));

    // Fetch users data only if the user's role is 'admin'
    if (role && role.toLowerCase() === 'admin') {
      getUsers()
        .then(response => {
          console.log("Users fetched:", response.data);
          setUsers(response.data);
        })
        .catch(error => console.error("Error fetching users:", error));
    }
  }, []);

  const handleProductSearch = (e) => {
    setProductSearchTerm(e.target.value);
  };

  const handleUserSearch = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const handleEditProduct = (id) => {
    getProductById(id)
      .then(response => {
        navigate(`/editproduct/${id}`, { state: { product: response.data } });
      })
      .catch(error => console.error("Error fetching product by ID:", error));
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter(product => product.productId !== id));
        setNotification("Product has been deleted.");
        setTimeout(() => setNotification(""), 1000);
      })
      .catch(error => console.error("Error deleting product:", error));
  };

  const filteredUsers = users.filter((user) =>
    user.username && user.username.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleEditUser = (id) => {
    getUserById(id)
      .then(response => {
        navigate(`/edituser/${id}`, { state: { user: response.data } });
      })
      .catch(error => console.error("Error fetching user by ID:", error));
  };

  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter(user => user.userId !== id));
        setNotification("User has been deleted.");
        setTimeout(() => setNotification(""), 1000);
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <div className='button-container'>
              <li><a href="#product-management"><button>Product Management</button></a></li>
              {userRole && userRole.toLowerCase() === 'admin' && (
                <>
                  <li><a href="#user-management"><button>User Management</button></a></li>
                  <li><Link to="/createproduct"><button>Create Product</button></Link></li>
                </>
              )}
              <li><Link to="/signin"><button>Sign in</button></Link></li>
            </div>
          </ul>
        </nav>
      </header>
      <main>
        {notification && <div className="notification">{notification}</div>}
        <h2 id="product-management">Product Management</h2>
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
                <td className='button-container-tables'>
                  <button onClick={() => handleEditProduct(product.productId)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {userRole && userRole.toLowerCase() === 'admin' && (
          <>
            <h2 id="user-management" className='tables-headers'>User Management</h2>
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
                  <tr key={index} ref={el => userRefs.current[user.id] = el}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className='button-container-tables'>
                      <button onClick={() => handleEditUser(user.userId)}>Edit</button>
                      <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;