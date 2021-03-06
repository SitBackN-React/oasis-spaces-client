import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CheckMark = (props) => {
  const [checked, setChecked] = useState({
    name: props.list.name,
    description: props.list.description,
    // checkmark: false
    checkmark: props.list.checkmark
    // didChange: false
  })
  // const [setUpdated] = useState(false)
  // console.log(props)

  const handleChange = (event) => setChecked((e) => {
    // console.log(!e.checkmark)

    return { name: props.list.name,
      description: props.list.description,
      checkmark: !checked.checkmark
    }
  })
  // console.log(checked)
  // console.log(checked, props.list.name, props.list.description)
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/lists/${props.list._id}/checkmark`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      // updating the checked property of a list
      data: { list: {
        checkmark: !checked.checkmark,
        name: props.list.name,
        description: props.list.description } }
    })
      // .then(res => console.log(res))
      .catch(console.error)
  }
  // console.log(props.list)
  // console.log(' ')
  return (
    <li key={props.list._id}>
      <div className="list-row">
        <input className="checkbox" type="button" value={ checked.checkmark ? '✔' : '' } onClick={(event) => {
          handleChange(event)
          handleSubmit(event)
        } } />

      </div>

      <div className="list-row" >
        <Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
      </div>
    </li>
  )
}
export default CheckMark
