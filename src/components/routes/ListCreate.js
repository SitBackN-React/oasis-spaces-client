import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ListForm from './../shared/ListForm'
// import Layout from './../shared/Layout

const ListCreate = (props) => {
  // console.log(props)
  // const token = props.user.token
  // console.log(token)

  const [list, setList] = useState({ name: '', description: '' })
  const [createdListId, setCreatedListId] = useState(null)
  const handleChange = event => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    const updatedField = { [event.target.name]: event.target.value }

    const editedList = Object.assign({}, list, updatedField)

    setList(editedList)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log(token)
    axios({
      url: `${apiUrl}/lists`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { list }
    })
      .then(res => setCreatedListId(res.data.list.id))
      .catch(console.error)
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
        cancelPath='/'
      />
    </div>
  )
}

export default ListCreate
