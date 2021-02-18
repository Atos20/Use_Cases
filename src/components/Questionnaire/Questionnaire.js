import React, { useState, useRef } from 'react'
import { Formik, Field, Form } from 'formik'
import './Questionnaire.css'

const Questionnaire = ({questions}) => {
  const [data, setData] = useState({})
  const [index, setIndex] = useState(0)
  let currentQuestion = questions[index]
  const inputRef = useRef();

  const goUp= () => {
    inputRef.current.focus();
    inputRef.current.value = ""
    if(index <= (questions.length -2) ) {
      setIndex(index + 1)
    }
  }

  const goDown= () => {
    inputRef.current.focus();
    inputRef.current.value = ""
    if(index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <div>

      <h1>Use Case</h1>
      <div className="info">
        <h2 className="description">{currentQuestion.category}</h2>
        <p className="text">{currentQuestion.description}</p>
      </div>
      <div className="controls" >
        <button className="back"  onClick={() => goDown()}>back</button>
        <button className="next"  onClick={() => goUp()}>next</button>
      </div>

      <Formik
        initialValues={{ [currentQuestion.category]: ''}}
        onSubmit={(values, actions) => {
          setData(values)
            actions.resetForm()
            actions.setSubmitting(false);
        }}
      >

        {({ values, handleChange, handleBlur })=> (
        <div className="questionnaire">
          <Form className="questionnaire" >
          <input
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={currentQuestion.category}
              name={currentQuestion.category}
              type="text"
              value={values.target}
              ref={inputRef}
            />
          
            <pre>
              {JSON.stringify(values)}
            </pre>

            <div className="btn">
              {index === (questions.length -1) && <button type="submit">Submit</button>}
            </div>
          </Form>
        </div>
      )}

    </Formik>

    
   </div>
  )
}

export default Questionnaire;
//state = useState({})
/*
data requires 5 entries???
data = {
  1   'target '    : 'user input', => select drop down
  2   'company type'   : 'user input', => select drop down
  3   'product name'     : 'user input', =>  user input 
  4   'action or event '    : 'user input', => user input
  5   'task to solve'    :'user input' => user input 
}
*/


  // Use Formik
  //hook to get the information //check docs

  //
  //  create a controlled form 
  // string validation => making sure it is not empty
  // gather the data in the state


  // witht state SUbmit Fn