import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, editUser } from '../../apis/users'
import FormUser from '../../components/FromUser'

const DEFAULT_FORM_DATA = { name: '', email: '' }

const UserEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)

  useEffect(() => {
    getUser(id)
      .then(res => {
        setFormData(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  const onChange = e => {
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = () => {
    editUser(formData.id, formData)
      .then(res => {
        navigate('/users')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      User Edit
      <FormUser formData={formData} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}

export default UserEdit
