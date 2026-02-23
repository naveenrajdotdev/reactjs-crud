import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Product() {

  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });

  const [editId, setEditId] = useState(null);

  const API = 'https://698b02f26c6f9ebe57bb5779.mockapi.io/Product';

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 🔹 Get Products
  const getProducts = async () => {
    const res = await axios.get(API);
    setProduct(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔹 Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      await axios.put(`${API}/${editId}`, formData);
      alert("Product Updated Successfully");
      setEditId(null);
    } else {
      // ADD
      await axios.post(API, formData);
      alert("Product Added Successfully");
    }

    setFormData({ name: '', price: '' });
    getProducts();
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    alert("Product Deleted Successfully");
    getProducts();
  };

  // 🔹 Edit
  const handleEdit = (val) => {
    setFormData({
      name: val.name,
      price: val.price
    });

    setEditId(val.id);
  };

  return (
    <div>

      <h2>Product CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <button>
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            product.map((val) => (
              <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.price}</td>
                <td>
                  <button onClick={() => handleEdit(val)}>Edit</button>
                  <button onClick={() => handleDelete(val.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default Product;