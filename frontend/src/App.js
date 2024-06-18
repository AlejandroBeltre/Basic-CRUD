import React, {useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
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
        role: "User",
      },
  ]);
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

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/createuser" element={<CreateUser addUser={addUser} />} />
          <Route path="/editproduct/:id" element={<EditProduct products={products} updateProduct={updateProduct} />} />
          <Route path="/edituser/:id" element={<EditUser users={users} updateUser={updateUser} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
          <Route path="/user/:id" element={<UserDetails users={users} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;