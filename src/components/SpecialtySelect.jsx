import React from 'react'

function SpecialtySelect({ select, state }) {
  const handleChange = (e) => {
    select({ ...state, specialty: e.target.value })
  }
  return (
    <div className='input-container'>
      <label htmlFor='specialty'>Specialty</label>
      <select
        name='specialty'
        id='specialty'
        value={state.specialty}
        onChange={handleChange}
        className='speciality-select'
      >
        <option value='general' selected>
          General
        </option>
        <option value='pediatric'>Pediatric</option>
        <option value='orthodontist'>Orthodontist</option>
        <option value='periodontist'>Periodontist</option>
        <option value='endodontist'>Endodontist</option>
        <option value='Oral Surgeon'>Oral Surgeon</option>
        <option value='prosthodontist'>Prosthodontist</option>
      </select>
    </div>
  )
}

SpecialtySelect.defaultProps = {
  general: true,
}

export default SpecialtySelect
