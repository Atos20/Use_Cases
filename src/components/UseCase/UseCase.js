import React from 'react'
import Questionnaire from '../Questionnaire'
import './UseCase.css'

const UserCase = () => {

  const questions = [
    {
      category: 'Target',
      description: 'Who is going to be using the following use case'
    },
    {
      category: 'Company type' ,
      description: 'Where is the following product will be use, e.g law firms, inhouse legal departments'
    },
    {
      category: 'Product name' ,
      description: 'Plese insert the name of the product'
    },
    {
      category: 'Action',
      description: 'Describe an event for the use of the product, perhaps an app action'
    },
    {
      category: 'Task',
      description: 'Describe the task the product helps the end-use with / the ise case for the product'
    }
  ]

  return (

    <div className="UseCase">
      <Questionnaire questions={questions}/>
    </div>
  )
}

export default UserCase;
