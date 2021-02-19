import React, { useState, useRef, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import './Questionnaire.css'


const Questionnaire = ({questions}) => {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  let currentQuestion = questions[index];
  const inputRef = useRef('');
  
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('data'))|| null)
  }, [])

  const goUp= (error, values) => {
    console.log(values)
    if(error[currentQuestion.category] || !values['Target']){
      return false
    }
    inputRef.current.focus();
    inputRef.current.value = ""
    if(index <= (questions.length -2) ) {
      setIndex(index + 1)
    }
  }

  const goDown= (error) => {
    console.log(error)
    inputRef.current.focus();
    inputRef.current.value = ""
    if(index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <div className='parent'>

      <h1 className='case'>Use Case</h1>
      <div className="container">

          <div className="left">

            <div className="sec-1">

              <div className="info">
                <h1 className="description">Input</h1>
                <h2 className="description">{currentQuestion.category} Section</h2>
                <p className="text">{currentQuestion.description}</p>

            </div>

            <div className="sec-2">

            </div>

                <Formik
                  initialValues={{ [currentQuestion.category]: ''}}
                  onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    setData(values)
                    setSubmitting(false);
                    resetForm()
                    localStorage.setItem('data', JSON.stringify(values));
                    console.log(values)
                  }}

                  // validationSchema={ yup.object({
                  //   [currentQuestion.category] : yup.string()
                  //     .min(1, 'more than one character please')
                  //     .max(100, 'no more than 100 characters')
                  //     .required()
                  // })}

                  validate={values  => {
                    const errors = {}
                    
                      if(!values[currentQuestion.category] || !values['Target']) {
                        errors[currentQuestion.category] = 'incorrect entry'
                      }
                      return errors
                  }}
                >

                  {( {errors, values, handleChange, handleBlur })=> (
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

                      <div className="controls" >

                        <Button 
                          variant="contained" 
                          color="primary" 
                          className="back"  
                          onClick={() => goDown(errors, values)}
                          >back</Button>

                        <Button
                          className="next" 
                          variant="contained" 
                          color="primary"  
                          onClick={() => goUp(errors, values)}
                          >next</Button>
                      </div>

                      <pre>{JSON.stringify(errors, null, 2)}</pre>
                      <p className="preview-text">{errors[currentQuestion.category]}</p>


                      <div className="btn">
                        {index === (questions.length -1) && 
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          type="submit" 
                          >Submit</Button>}
                      </div>

                      <div className="rigth">
                        <h1 className="display"> Output </h1>
                        <h3 className="your-answer">using formik.values</h3>
                        <p className="preview-text">{values[currentQuestion.category]}</p>
                        <h3 className="your-answer">using useRef</h3>
                        <p className="preview-title">{inputRef.current.value}</p>


                        <div className="preview-section">
                          
                          <h3 className="your-answer">Preview</h3>

                          <p className="preview-text">
                            <span className="bold">Product case 1:</span>
                            <br/>
                            <span className="bold"> {values['Target'] || '[________]'} </span> at 
                            <span className="bold"> {values['Company type'] || '[________]'} </span> use  
                            <span className="bold"> {values['Product name'] || '[________]'} </span>in order to  
                            <span className="bold"> {values['Action'] || '[________]'} </span>
                            <span className="bold"> {values['Task'] || '[________]'} </span>

                          </p>
                        </div>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>

      </div>
  
   </div>
  )
}

export default Questionnaire;