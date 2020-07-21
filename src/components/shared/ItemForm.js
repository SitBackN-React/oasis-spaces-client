import React from 'react'
import { Link } from 'react-router-dom'

const ItemForm = ({ item, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Item Name</label>
      <input
        placeholder="Example: Go get newspaper"
        value={item.name}
        name="name"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Note</label>
      <input
        placeholder="(Optional) Example: Get after 9am"
        value={item.note}
        name="note"
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default ItemForm
