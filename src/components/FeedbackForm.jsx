import React, { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import SpecialtySelect from './SpecialtySelect'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const initialState = {
    specialty: 'general',
    generalYears: '',
    specialtyYears: '',
    employer: 'small_practice',
    city: '',
    salary: '',
    productionBonus: '',
    signOnBonus: '',
  }

  const initialMessage = {
    specialty: null,
    generalYears: null,
    specialtyYears: null,
    employer: null,
    city: null,
    salary: null,
    productionBonus: null,
    signOnBonus: null,
    submit: null,
  }

  const [state, setState] = useState(initialState)
  const [message, setMessage] = useState(initialMessage)

  const handleGeneralYearsChange = ({ target: { value } }) => {
    if (value === '') {
      setMessage({ ...message, generalYears: null })
    } else if (value > 80) {
      setMessage({
        ...message,
        generalYears:
          'Wow you must be really experienced! Can you confirm your entry?',
      })
    } else {
      setMessage({ ...message, generalYears: null })
    }

    setState({
      ...state,
      generalYears: value,
    })
  }

  const handleSpecialtyYearsChange = ({ target: { value } }) => {
    if (value === '') {
      setMessage({ ...message, specialtyYears: null })
    } else if (value > 70) {
      setMessage({
        ...message,
        specialtyYears: "That's a lot of years! Is that right?",
      })
    } else {
      setMessage({ ...message, specialtyYears: null })
    }

    setState({
      ...state,
      specialtyYears: value,
    })
  }

  const handleEmployerChange = ({ target: { value } }) => {
    setState({ ...state, employer: value })
  }

  const handleCityChange = ({ target: { value } }) => {
    setState({ ...state, city: value })
  }

  const handleSalaryChange = ({ target: { value } }) => {
    if (value === '') {
      setMessage({ ...message, salary: null })
    } else if (value < 0) {
      setMessage({ ...message, salary: "Salary can't be a negative amount" })
    } else {
      setMessage({ ...message, salary: null })
    }

    setState({ ...state, salary: value })
  }

  const handleProductionBonus = ({ target: { value } }) => {
    if (value === '') {
      setMessage({ ...message, productionBonus: null })
    } else if (value < 0) {
      setMessage({
        ...message,
        productionBonus: "Bonus can't be a negative amount",
      })
    } else {
      setMessage({ ...message, productionBonus: null })
    }

    setState({ ...state, productionBonus: value })
  }

  const handleSignOnBonus = ({ target: { value } }) => {
    if (value === '') {
      setMessage({ ...message, signOnBonus: null })
    } else if (value < 0) {
      setMessage({
        ...message,
        signOnBonus: "Bonus can't be a negative amount",
      })
    } else {
      setMessage({ ...message, signOnBonus: null })
    }

    setState({ ...state, signOnBonus: value })
  }

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  // REVIEW THIS
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      let data = feedbackEdit.item
      setState(data)
    }
  }, [feedbackEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(state).every((item) => item)) {
      const newFeedback = {
        ...state,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setState(initialState)
    } else {
      setMessage({
        ...message,
        submit: 'All fields must be filled out!',
      })
      setTimeout(() => {
        setMessage({
          ...message,
          submit: null,
        })
      }, '3000')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>What would you like to share anonymously with your community?</h2>

        <SpecialtySelect select={setState} state={state} />

        <div className='input-container'>
          <label>Years of Experience as a General Dentist</label>
          <input
            type='number'
            min={0}
            className='num-input'
            value={state.generalYears}
            onChange={handleGeneralYearsChange}
          />
        </div>
        {message.generalYears && (
          <div className='message'>{message.generalYears}</div>
        )}

        <div className='input-container'>
          <label>Years of Experience as a Specialist</label>
          <input
            type='number'
            min={0}
            className='num-input'
            value={state.specialtyYears}
            onChange={handleSpecialtyYearsChange}
          />
        </div>
        {message.specialtyYears && (
          <div className='message'>{message.specialtyYears}</div>
        )}

        <div className='input-container'>
          <label>Employer Type</label>
          <select
            name='employer'
            value={state.employer}
            onChange={handleEmployerChange}
          >
            <option value='small_private'>Small Private Practice</option>
            <option value='large_private'>Large Private Practice</option>
            <option value='corporate'>Corporate</option>
            <option value='hospital'>Hospital</option>
          </select>
        </div>

        <div className='input-container'>
          <label>City</label>
          <input
            type='text'
            className='text-input'
            value={state.city}
            onChange={handleCityChange}
            placeholder='New York City'
          />
        </div>

        <div className='input-container'>
          <label>Salary</label>
          <div className='num-input'>
            <span className='currency'>
              $
              <input
                type='number'
                value={state.salary}
                onChange={handleSalaryChange}
                name='salary'
              />
            </span>
          </div>
        </div>
        {message.salary && <div className='message'>{message.salary}</div>}

        <div className='input-container'>
          <label>Production Bonus</label>
          <div className='num-input'>
            <span className='currency'>
              $
              <input
                type='number'
                value={state.productionBonus}
                onChange={handleProductionBonus}
                name='productionBonus'
              />
            </span>
          </div>
        </div>
        {message.productionBonus && (
          <div className='message'>{message.productionBonus}</div>
        )}

        <div className='input-container'>
          <label>Sign-On Bonus</label>
          <div className='num-input'>
            <span className='currency'>
              $
              <input
                type='number'
                value={state.signOnBonus}
                onChange={handleSignOnBonus}
              />
            </span>
          </div>
        </div>
        {message.signOnBonus && (
          <div className='message'>{message.signOnBonus}</div>
        )}

        <div className='center'>
          <Button type='submit'>
            {feedbackEdit.edit === true ? 'Edit' : 'Submit'}
          </Button>
        </div>
        {message.submit && <div className='message'>{message.submit}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
