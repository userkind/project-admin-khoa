import { useState, useEffect } from 'react'
import { getOrganization } from '../../../apis/organizations'

const ModalView = ({ id }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (id) {
      getOrganization(id)
        .then(res => {
          setData(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [id])

  return (
    <div id='modal-view-organization' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>View Organization</h5>
            <button className='btn-close' data-bs-dismiss='modal' />
          </div>
          <div className='modal-body'>
            <div className='mb-3'>Name: {data.name}</div>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' data-bs-dismiss='modal'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalView
