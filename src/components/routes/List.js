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
        variant: 'primary'
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
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'List Deleted',
        message: messages.deleteListSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setList({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteListFailure,
          variant: 'danger'
        })
      })
  }
  if (!list) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/lists', state: { msg: 'List succesfully deleted!' }
      }} />
    )
  }
  // list.items.map(item => (
  //   <li key={item._id}>
  //     <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
  //   </li>
  // ))
  const itemsJsx = list.items.map(item => (
    <li key={item._id}>
      <div className="list-row">
      </div>
      <div className="list-row">
        <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
      </div>
    </li>
  ))
  return (
    <div className="list-style">
      <h4>{list.name}</h4>
      <p>{list.description}</p>
      <div className="center">
        <div className="list-display">
          {itemsJsx}
        </div>
      </div>
      <br />
      <div>
        <button className="button btn btn-danger" onClick={destroy}>Delete List</button>
        <Link to={`/lists/${props.match.params.id}/create-item`}>
          <button className="button btn btn-success">Create Item</button>
        </Link>
        <Link to={`/lists/${props.match.params.id}/edit`}>
          <button className="button btn btn-warning">Edit List</button>
        </Link>
      </div>
      <div>
        <Link to='/lists'>Back to all lists</Link>
      </div>
    </div>
  )
}
export default List
