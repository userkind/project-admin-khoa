import { Link } from 'react-router-dom'
import './style.css'

const List = ({ list, onDelete }) => {
  return (
    <div className='row'>
      {list.map(item => {
        return (
          <div key={item.id} className='col-4'>
            <div className='user'>
              <main className='user-main'>
                <h6>Name: {item.name}</h6>
                <div>Email: {item.email}</div>
              </main>

              <footer className='user-footer'>
                <Link to={`/user/${item.id}`}>
                  <button className='btn btn-sm'>View</button>
                </Link>

                <Link to={`/user/${item.id}/edit`}>
                  <button className='btn btn-sm'>Edit</button>
                </Link>

                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => {
                    onDelete(item.id)
                  }}
                >
                  Delete
                </button>
              </footer>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List
