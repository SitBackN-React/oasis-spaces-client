import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CheckMark = (props) => {
  const [checked, setChecked] = useState({
    checkmark: false
  })
  console.log(props)

  const checkMark = (id) => setChecked((e) => {
    console.log(!e.checkmark)
    if (e.checkmark === false) {
      e.checkmark = true
    } else {
      e.checkmark = false
    }
    console.log('checkmark is currently ', id, 'right now, the checkmark is ', e.checkmark, 'opposite of checkmark status ', !e.checkmark)
    return { checkmark: e.checkmark }
  })

  return (
    <li key={props.list._id}>
      <div className="list-row">
        <input className="checkbox" type="checkbox" onChange={() => checkMark(props.list._id)} value={props.list.checkmark}/>
      </div>

      <div className="list-row" style= {{ textDecoration: checked.checkmark === true ? 'line-through' : 'none' }} >
        <Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
      </div>
    </li>
  )
}
export default CheckMark
