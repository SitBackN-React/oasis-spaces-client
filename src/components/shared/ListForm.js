import React from 'react'
import { Link } from 'react-router-dom'

const ListForm = ({ list, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>List Name</label>
      <input
        placeholder="Example: To Do List"
        value={list.name}
        name="name"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Description</label>
      <input
        placeholder="Example: Today's List"
        value={list.description}
        name="description"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default ListForm
