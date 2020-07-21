import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ItemForm from './../shared/ItemForm'
import messages from './../AutoDismissAlert/messages'

const ItemCreate = (props) => {
  const [item, setItem] = useState({ name: '', note: '' })
  const [createdItemId, setCreatedItemId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign({}, item, updatedField)

    setItem(editedItem)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props
    axios({
      url: `${apiUrl}/lists/${props.match.params.id}`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { item }
    })
      .then(res => {
        const newItemId = res.data.list.items[res.data.list.items.length - 1]._id
        return newItemId
      })
      .then(newItemId => setCreatedItemId(newItemId))
      .then(() => msgAlert({
        heading: 'Created item successfully',
        message: messages.createItemSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setItem({ name: '', note: '' })
        msgAlert({
          heading: 'Create item failed: ' + error.message,
          message: messages.createListFailure,
          variant: 'danger'
        })
      })
  }
  if (createdItemId) {
    return <Redirect to={`/lists/${props.match.params.id}`} />
  }

  return (
    <div>
      <ItemForm
        item={item}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/lists/${props.match.params.id}`}
      />
    </div>
  )
}

export default ItemCreate
