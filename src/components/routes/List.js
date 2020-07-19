import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import ItemCreate from './ItemCreate'
import messages from './../AutoDismissAlert/messages'

const List = (props) => {
  const [list, setList] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/lists/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setList(res.data.list))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Showing selected list',
        message: messages.showListSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setList({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to show list ' + error.message,
          message: messages.showListFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/lists/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
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

  // list.items.map(item => (
  //   <li key={item._id}>
  //     <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
  //   </li>
  // ))

  return (
    <div>
      <h4>{list.name}</h4>
      <p>{list.description}</p>
      <div>{list.items.map(item => (
        <li key={item._id}>
          <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
        </li>
      ))}</div>
      <Link to={`/lists/${props.match.params.id}/create-item`}>
        <button>Create Item</button>
      </Link>
      <button onClick={destroy}>Delete List</button>
      <Link to={`/lists/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/lists'>Back to all lists</Link>
    </div>
  )
}

export default List
