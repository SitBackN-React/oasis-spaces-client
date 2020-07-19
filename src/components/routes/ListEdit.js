import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListForm from '../shared/ListForm'
import messages from './../AutoDismissAlert/messages'

const ListEdit = props => {
  const [list, setList] = useState({
    name: '',
    description: ''
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
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
        heading: 'Edited List',
        message: messages.editListSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setList({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to update ' + error.message,
          message: messages.editListFailure,
          variant: 'danger'
        })
      })
  }, [])
  const handleChange = event => {
    event.persist()
    setList(prevList => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedList = Object.assign({}, prevList, updatedField)
      return editedList
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/lists/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { list }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  if (updated) {
    return <Redirect to={`/lists/${props.match.params.id}`} />
  }
  return (
    <div>
      <ListForm
        list={list}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/lists/${props.match.params.id}`}
      />
    </div>
  )
}
export default ListEdit
