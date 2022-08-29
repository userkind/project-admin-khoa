import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../apis/users'
import FormUser from '../../components/FromUser'

const DEFAULT_FORM_DATA = { name: '', email: '' }

const UserCreate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)

  const onChange = e => {
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = () => {
    createUser(formData)
      .then(res => {
        navigate('/users')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      User Create
      <FormUser formData={formData} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}

export default UserCreate
