import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUser } from '../../apis/users'

const UserEdit = () => {
  const { id } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    getUser(id)
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  return (
    <div>
      <Link to='/users'>
        <button className='btn btn-secondary'>Back</button>
      </Link>
      User Edit
      
      <div className='mb-3'>Name: {data.name}</div>
      <div className='mb-3'>Email: {data.email}</div>
      <div className='mb-3'>Phone: {data.phone}</div>
    </div>
  )
}

export default UserEdit
