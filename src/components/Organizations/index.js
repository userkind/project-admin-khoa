import { useState, useMemo, useEffect } from 'react'
import Form from './Form'
import List from './List'
import ModalView from './ModalView'
import './style.css'
import { getOrganizations, createOrganization, editOrganization, deleteOrganization } from '../../apis/organizations'

const DEFAULT_FORM_DATA = { name: '' }

const validate = (list, formData) => {
  if (formData.name === '') {
    return false
  }

  // Create
  if (!formData.id) {
    const item = list.find(item => {
      return item.name === formData.name
    })

    return item ? false : true
  }

  // Edit
  if (formData.id) {
    const item = list.find(item => {
      return (
        item.id !== formData.id &&
        (item.name === formData.name)
      )
    })

    return item ? false : true
  }

  return false
}

const ProjectAdmin = () => {
  const [selectedId, setSelectedId] = useState()
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const resultList = useMemo(() => {
    if (search) {
      const newResultList = list.filter(item => {
        return item.name.includes(search)
      })

      return newResultList
    }

    return list
  }, [search, list])

  const fetchData = () => {
    getOrganizations()
      .then(response => {
        setList(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onChange = e => {
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = () => {
    const isValidated = validate(list, formData)

    if (isValidated) {
      if (!formData.id) {
        createOrganization(formData)
          .then(res => {
            fetchData()
            setFormData(DEFAULT_FORM_DATA)
          })
          .catch(error => {
            console.log(error)
          })
      }

      if (formData.id) {
        editOrganization(formData.id, formData)
          .then(res => {
            fetchData()
            setFormData(DEFAULT_FORM_DATA)
          })
          .catch(error => {
            console.log(error)
          })
      }

      const element = document.querySelector('#modal-form-organization')
      const modal = window.bootstrap.Modal.getOrCreateInstance(element)
      modal.hide()
    }
  }

  const onCreate = () => {
    setFormData(DEFAULT_FORM_DATA)

    const element = document.querySelector('#modal-form-organization')
    const modal = window.bootstrap.Modal.getOrCreateInstance(element)
    modal.show()
  }

  const onView = id => {
    setSelectedId(id)

    const element = document.querySelector('#modal-view-organization')
    const modal = window.bootstrap.Modal.getOrCreateInstance(element)
    modal.show()
  }

  const onEdit = data => {
    setFormData(data)

    const element = document.querySelector('#modal-form-organization')
    const modal = window.bootstrap.Modal.getOrCreateInstance(element)
    modal.show()
  }

  const onDelete = id => {
    deleteOrganization(id)
      .then(res => {
        fetchData()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onSearch = e => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <div>
      <header className='header row'>
        <h4 className='col-7'>Organizations</h4>

        <div className='col-3'>
          <input
            className='form-control'
            value={search}
            placeholder='Type to search...'
            onChange={onSearch}
          />
        </div>

        <div className='col-2'>
          <button className='btn btn-primary' onClick={onCreate}>
            Create
          </button>
        </div>
      </header>

      {resultList.length === 0 && <div>No data found</div>}

      <List
        list={resultList}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Form formData={formData} onChange={onChange} onSubmit={onSubmit} />

      <ModalView id={selectedId} />
    </div>
  )
}

export default ProjectAdmin
