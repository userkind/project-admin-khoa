import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import List from './List'
import './style.css'
import { getUsers, deleteUser } from '../../apis/users'

const ProjectAdmin = () => {
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const resultList = useMemo(() => {
    if (search) {
      const newResultList = list.filter(item => {
        return item.name.includes(search) || item.email.includes(search)
      })

      return newResultList
    }

    return list
  }, [search, list])

  const fetchData = () => {
    getUsers()
      .then(response => {
        setList(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onDelete = id => {
    deleteUser(id)
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
        <h4 className='col-7'>Users</h4>

        <div className='col-3'>
          <input
            className='form-control'
            value={search}
            placeholder='Type to search...'
            onChange={onSearch}
          />
        </div>

        <div className='col-2'>
          <Link to='/user/create'>
            <button className='btn btn-primary'>Create</button>
          </Link>
        </div>
      </header>

      {resultList.length === 0 && <div>No data found</div>}

      <List list={resultList} onDelete={onDelete} />
    </div>
  )
}

export default ProjectAdmin
