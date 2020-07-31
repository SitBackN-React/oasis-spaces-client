import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CheckMark = (props) => {
  const [checked, setChecked] = useState({
    checkmark: false
  })
  const [setUpdated] = useState(false)
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
  //  functions like a componentDidMount
  // useEffect(() => {
  //   axios({
  //     url: `${apiUrl}/lists/${props.list._id}`,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     }
  //   })
  //     .then(res => setChecked(res.data.list))
  //     .catch(console.error)
  // }, [])
  const handleChange = event => {
    event.persist()
    setChecked(prevList => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedCheck = Object.assign({}, prevList, updatedField)
      return editedCheck
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/lists/${props.list._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { checked }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  return (
    <li key={props.list._id}>
      <div className="list-row">
        <input className="checkbox" type="checkbox" onChange={() => checkMark(props.list._id)} handleSubmit={(event) => handleSubmit(event)} handleChange={(event) => handleChange(event)} value={props.list.checkmark}/>

      </div>

      <div className="list-row" style= {{ textDecoration: checked.checkmark === true ? 'line-through' : 'none' }} >
        <Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
      </div>
    </li>
  )
}
export default CheckMark
