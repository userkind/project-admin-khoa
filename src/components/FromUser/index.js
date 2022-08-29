import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const Form = ({ formData, onChange, onSubmit }) => {
  const disabled = useMemo(() => {
    return formData.name === '' || formData.email === ''
  }, [formData])

  return (
    <div>
      <div className='mb-3'>
        <label htmlFor='form-name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          id='form-name'
          name='name'
          className='form-control'
          placeholder='Nguyen Van A'
          value={formData.name}
          onChange={onChange}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='form-name' className='form-label'>
          Email
        </label>
        <input
          type='email'
          id='form-email'
          name='email'
          className='form-control'
          placeholder='name@example.com'
          value={formData.email}
          onChange={onChange}
        />
      </div>

      <Link to='/users'>
        <button className='btn btn-secondary'>Back</button>
      </Link>

      <button
        className='btn btn-primary'
        disabled={disabled}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  )
}

export default Form
