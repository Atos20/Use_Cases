import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import './Questionnaire.css'

const Questionnaire = () => {
  const [data, setData] = useState('')



  return (
    <div>
    <h1>Use Case</h1>
    <Formik
      initialValues={{ entry: '' }}
      onSubmit={(values, actions) => {
        console.log(values)
        setData(values.entry)
          console.log(actions)
          actions.resetForm()
          actions.setSubmitting(false);
      }}
    >
      {props => (
        <Form >
          <Field 
            placeholder='text'
            name='entry'
            type='input'
            value={props.values.entry}
          />
        
          {/* <input
            placeholder
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.entry}
            name="entry"
          /> */}
          <pre>
            {JSON.stringify(props.values)}
          </pre>
          {data && <h1 className="display">{data}</h1>}
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <div className="btn">

            <button type="submit">Submit</button>
          </div>
        </Form>
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