import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ItemForm from '../shared/ItemForm'
import messages from './../AutoDismissAlert/messages'

const ItemEdit = props => {
  const [item, setItem] = useState({
    name: '',
    note: ''
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
  const handleChange = event => {
    event.persist()
    setItem(prevItem => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign({}, prevItem, updatedField)
      return editedItem
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}${props.location.pathname}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { item }
    })
      .then(() => setUpdated(true))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Edited Item Successfully',
        message: messages.editItemSuccess,
        variant: 'warning'
      }))
      .catch(error => {
        setUpdated({ name: '', note: '' })
        msgAlert({
          heading: 'Failed to update item ' + error.message,
          message: messages.editItemFailure,
          variant: 'danger'
        })
      })
  }
  if (updated) {
    return <Redirect to={`/lists/${props.location.pathname}`} />
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
export default ItemEdit
