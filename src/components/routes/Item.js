import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Item = (props) => {
  const [item, setItem] = useState(null)
  const [deleted, setDeleted] = useState(false)
  console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}${props.location.pathname}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setItem(res.data.item))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}${props.location.pathname}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!item) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/', state: { msg: 'Item succesfully deleted!' }
      }} />
    )
  }

  return (
    <div>
      <h4>{item.name}</h4>
      <p>{item.note}</p>
      <button onClick={destroy}>Delete Item</button>
      <Link to={`${props.location.pathname}/edit-item`}>
        <button>Edit Item</button>
      </Link>
      <Link to='/lists/:id'>Back to list</Link>
    </div>
  )
}

export default Item
