import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CheckMark = (props) => {
  const [checked, setChecked] = useState({
    checkmark: []
  })
  console.log(props)

  const checkMark = (id) => setChecked((e) => {
    console.log('checkmark is currently ', id, !e.checkmark)
    if (e.checkmark.includes(id)) {
      e.checkmark.pop(id)
    } else {
      e.checkmark.push(id)
    }
    return { checkmark: e.checkmark }
  })

  return (
    <li key={props.list._id}>
      <div className="list-row">
        <input className="checkbox" type="checkbox" onChange={() => checkMark(props.list._id)} value={props.list.checkmark}/>
      </div>

      <div className="list-row" style= {{ textDecoration: checked.checkmark.includes(props.list._id) ? 'line-through' : 'none' }} >
        <Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
      </div>
    </li>
  )
}
export default CheckMark
