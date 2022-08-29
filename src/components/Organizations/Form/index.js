import { useMemo } from 'react'

const Form = ({ formData, onChange, onSubmit }) => {
  const disabled = useMemo(() => {
    return formData.name === ''
  }, [formData])

  return (
    <div id='modal-form-organization' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {formData.id ? 'Edit' : 'Create'} Organization
            </h5>
            <button className='btn-close' data-bs-dismiss='modal' />
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label htmlFor='form-name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                id='form-name'
                name='name'
                className='form-control'
                placeholder='Green Academy'
                value={formData.name}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' data-bs-dismiss='modal'>
              Cancel
            </button>
            <button
              className='btn btn-primary'
              disabled={disabled}
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
