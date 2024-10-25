import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 20 },
    { id: 2, name: 'Product 2', price: 150, quantity: 15 },
    { id: 3, name: 'Product 3', price: 200, quantity: 10 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProduct = () => {
    const { name, price, quantity } = newProduct;
    if (name && price && quantity) {
      const newId = products.length ? Math.max(products.map(product => product.id)) + 1 : 1; // Tìm ID lớn nhất
      setProducts([...products, { id: newId, ...newProduct }]);
      resetForm();
    }
  };

  const editProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setCurrentProductId(product.id);
  };

  const updateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === currentProductId ? { ...product, ...newProduct } : product
    );
    setProducts(updatedProducts);
    resetForm();
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const resetForm = () => {
    setNewProduct({ name: '', price: '', quantity: '' });
    setIsEditing(false);
    setCurrentProductId(null);
  };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Form để thêm/sửa sản phẩm */}
      <div className="add-product-form">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <button onClick={isEditing ? updateProduct : addProduct}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Hiển thị danh sách sản phẩm */}
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => editProduct(product)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(product.id)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
