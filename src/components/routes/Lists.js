import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

const Lists = (props) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/lists`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setLists(res.data.lists))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h4>Lists</h4>
      <ul>
        {lists && lists.length > 0
          ? lists.map(list => {
            return <div key={list._id}><Link to={`/lists/${list._id}`}>{list.name}</Link></div>
          })
          : 'Loading...'}
      </ul>
    </div>
  )
}

export default Lists
