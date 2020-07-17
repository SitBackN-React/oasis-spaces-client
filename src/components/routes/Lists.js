import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Lists = props => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/lists`)
      .then(res => setLists(res.data.lists))
      .catch(console.error)
  }, [])

  const listsJsx = lists.map(list => (
    <li key={list._id}>
      <Link to={`/lists/${list._id}`}>{list.name}</Link>
    </li>
  ))

  return (
    <div>
      <h4>Lists</h4>
      <ul>
        {listsJsx}
      </ul>
    </div>
  )
}

export default Lists
