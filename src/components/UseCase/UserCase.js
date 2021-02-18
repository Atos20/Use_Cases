import React from 'react'
import { Formik, Field, Form } from 'formik'

const UserCase = () => {
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
  return (

    <div className="App">
      <h1>Contact Us</h1>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Field name="name" type="text" />
          <Field name="email" type="email" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserCase;
