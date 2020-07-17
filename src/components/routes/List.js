import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

const List = (props) => {
  const [list, setList] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/lists/${props.match.params.id}`)
      .then(res => setList(res.data.list))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/lists/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!list) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/', state: { msg: 'List succesfully deleted!' }
      }} />
    )
  }

  return (
    <div>
      <h4>{list.name}</h4>
      <p>{list.description}</p>
      <button onClick={destroy}>Delete List</button>
      <Link to={`/lists/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/lists'>Back to all lists</Link>
    </div>
  )
}

export default List
