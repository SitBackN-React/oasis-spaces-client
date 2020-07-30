import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Lists = (props) => {
  const [lists, setLists] = useState([])
  const [checked, setChecked] = useState({
    checkmark: []
  })

  const { msgAlert } = props
  console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/lists`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setLists(res.data.lists))
      // .catch(console.error)

      .then(() => msgAlert({
        heading: 'Showing all lists',
        message: messages.showListsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setLists({ name: '', description: '' })
        msgAlert({
          heading: 'Failed to show all lists ' + error.message,
          message: messages.showListsFailure,
          variant: 'danger'
        })
      })
  }, [])

  const checkMark = (id) => setChecked((e) => {
    console.log('checkmark is currently ', id, !e.checkmark)
    if (e.checkmark.includes(id)) {
      e.checkmark.pop(id)
    } else {
      e.checkmark.push(id)
    }
    return { checkmark: e.checkmark }
  })

  const listsJsx = lists.map(list => (
    <li key={list._id}>
      <div className="list-row">
        <input className="checkbox" type="checkbox" onChange={() => checkMark(list._id)} value={list.checkmark}/>
      </div>

      <div className="list-row" style= {{ textDecoration: checked.checkmark.includes(list._id) ? 'line-through' : 'none' }} >
        <Link to={`/lists/${list._id}`}>{list.name}</Link>
      </div>
    </li>
  ))

  return (
    <div className="list-style">
      <h4>My Lists</h4>
      <div className="center">
        <div className="list-display">
          {listsJsx}
        </div>
      </div>
      <Link to={'/create-list'}>
        <button className="button btn btn-success" >Create List</button>
      </Link>
    </div>
  )
}

export default Lists
