import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ListForm from './../shared/ListForm'
// import Layout from './../shared/Layout

const ListCreate = (props) => {
  console.log(props)

  const [list, setList] = useState({ name: '', description: '' })
  const [createdListId, setCreatedListId] = useState(null)
  const id = `${props.user._id}`
  const handleChange = event => {
    console.log(event.target.name)
    console.log(event.target.value)
    const updatedField = { [event.target.name]: event.target.value, [event.target.description]: event.target.value }

    const editedList = Object.assign({}, list, updatedField)

    setList(editedList)
  }

  const handleSubmit = (event, user) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/lists`,
      method: 'POST',
      header: {
        'Authorization': `Token token=${user.token}`
      },
      data: { list, id }
    })
      .then(res => setCreatedListId(res.data.list._id))
      .catch(console.error)
  }

  if (createdListId) {
    return <Redirect to={`/lists/${setCreatedListId}`} />
  }

  return (
    <div>
      <ListForm
        list={list}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    </div>
  )
}

export default ListCreate
