import React, {useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Homepage/homepage.jsx';
import CreateProduct from './Create/createproduct.jsx';
import CreateUser from './Create/createuser.jsx';
import EditProduct from './Edit/editproduct.jsx';
import ProductDetails from './Edit/productdetails.jsx';
import EditUser from './Edit/edituser.jsx';
import UserDetails from './Edit/userdetails.jsx';
import SignIn from './Signs/signin.jsx';
import SignUp from './Signs/signup.jsx';
import './App.css';
import './hidescrollbar.css';
import { getProducts, getUsers } from './api';

function App() {
  const isAuthenticated = !!localStorage.getItem('jwtToken');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (isAuthenticated) {
      getProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.error("Error fetching products:", error));
      
      getUsers()
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error fetching users:", error));
    }
  }, [isAuthenticated]); 

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };
  
  const updateUser = (updatedUser) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/createproduct" element={isAuthenticated ? <CreateProduct /> : <Navigate to="/signin" />} />
        <Route path="/createuser" element={isAuthenticated ? <CreateUser /> : <Navigate to="/signin" />} />
        <Route path="/editproduct/:id" element={isAuthenticated ? <EditProduct products={products} updateProduct={updateProduct} /> : <Navigate to="/signin" />} />
        <Route path="/edituser/:id" element={isAuthenticated ? <EditUser users={users} updateUser={updateUser} /> : <Navigate to="/signin" />} />
        <Route path="/product/:id" element={isAuthenticated ? <ProductDetails products={products} /> : <Navigate to="/signin" />} />
        <Route path="/user/:id" element={isAuthenticated ? <UserDetails users={users} /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;