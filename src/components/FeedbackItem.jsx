import React, { useContext } from 'react'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'
import { FaTimes, FaEdit } from 'react-icons/fa'

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  const toCurrency = (number) => {
    return new Intl.NumberFormat().format(number)
  }

  const toCapitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1)
  }

  return (
    <Card>
      <div className='num-display primary'>
        Salary: ${toCurrency(item.salary)}
      </div>
      <div className='num-display secondary'>
        <p>Production Bonus: ${toCurrency(item.productionBonus)}</p>
        <p>Sign On Bonus: ${toCurrency(item.signOnBonus)}</p>
        <p>Specialty: {toCapitalize(item.specialty)}</p>
      </div>
      <button onClick={() => deleteFeedback(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
    </Card>
  )
}

export default FeedbackItem
