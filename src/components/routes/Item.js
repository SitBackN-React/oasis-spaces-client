import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Item = (props) => {
  const [item, setItem] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}${props.location.pathname}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setItem(res.data.item))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Showing selected item',
        message: messages.showItemSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setItem({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to show item ' + error.message,
          message: messages.showItemFailure,
          variant: 'danger'
        })
      })
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
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Item Deleted',
        message: messages.deleteItemSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setItem({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteItemFailure,
          variant: 'danger'
        })
      })
  }

  if (!item) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={`/lists/${props.match.params.id}`} />
    )
  }

  return (
    <div className="list-style">
      <h4>{item.name}</h4>
      <p>{item.note}</p>
      <button onClick={destroy}>Delete Item</button>
      <Link to={`/lists/${props.match.params.id}/items/${props.match.params.itemId}/edit-item`}>
        <button className="button">Edit Item</button>
      </Link>
      <Link to={`/lists/${props.match.params.id}`}>Back to list</Link>
    </div>
  )
}

export default Item
