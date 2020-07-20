import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ItemForm from '../shared/ItemForm'

const ItemEdit = props => {
  const [item, setItem] = useState({
    name: '',
    note: ''
  })
  const [updated, setUpdated] = useState(false)
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
      .catch(console.error)
  }
  if (updated) {
    return <Redirect to={'/lists'} />
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
