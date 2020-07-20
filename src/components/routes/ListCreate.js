import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ListForm from './../shared/ListForm'
import messages from './../AutoDismissAlert/messages'

const ListCreate = (props) => {
  const [list, setList] = useState({ name: '', description: '' })
  const [createdListId, setCreatedListId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedList = Object.assign({}, list, updatedField)
    setList(editedList)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props
    axios({
      url: `${apiUrl}/lists`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { list }
    })
      // .then(res => console.log(res))
      .then(res => setCreatedListId(res.data.list._id))
      .then(() => msgAlert({
        heading: 'Create list success',
        message: messages.createListSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setList({ name: '', description: '' })
        msgAlert({
          heading: 'Create list failed: ' + error.message,
          message: messages.createListFailure,
          variant: 'danger'
        })
      })
  }

  if (createdListId) {
    return <Redirect to={`/lists/${createdListId}`} />
  }

  return (
    <div>
      <ListForm
        list={list}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/lists'
      />
    </div>
  )
}

export default ListCreate
