import React from 'react'
import { Link } from 'react-router-dom'

const ItemForm = ({ item, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Item Name</label>
    <input
      placeholder="Example: Go get newspaper"
      value={item.name}
      name="name"
      onChange={handleChange}
    />

    <label>Note</label>
    <input
      placeholder="(Optional) Example: Get after 9am"
      value={item.note}
      name="note"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ItemForm
