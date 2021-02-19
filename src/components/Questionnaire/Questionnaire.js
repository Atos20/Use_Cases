import React, { useState, useRef, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Button } from '@material-ui/core';
import Cases from '../Cases'
// import * as yup from 'yup';
import './Questionnaire.css'


const Questionnaire = ({questions}) => {
  const [cases, setCases] = useState([]);
  const [index, setIndex] = useState(0);
  let currentQuestion = questions[index];
  const inputRef = useRef('');
  
  useEffect(() => {
    inputRef.current.focus();
    setCases(JSON.parse(localStorage.getItem('data'))|| [])
  }, [])

  const goUp= (error, values) => {
    if(error[currentQuestion.category] || !values['Target']){
      return false
    }
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
    <div className='parent'>

      <h1 className='case-title'>Theorem</h1>
      <h1 className='case-title'>Use Case</h1>
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
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    setCases([...cases, {... values }])
                    localStorage.setItem('data', JSON.stringify([...cases, values]));
                    console.log(values)
                    setSubmitting(false);
                    resetForm()
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

                  {( { errors, values, handleChange, handleBlur })=> (
                  <div className="questionnaire">
                    <Form className="questionnaire" >
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={currentQuestion.category}
                        name={currentQuestion.category}
                        type="text"
                        value={values[currentQuestion.category]}
                        ref={inputRef}
                      />

                      <div className="controls" >

                        <Button 
                          variant="contained" 
                          color="primary" 
                          className="control"  
                          onClick={() => goDown(errors, values)}
                          >back</Button>

                        { index !== (questions.length -1) && <Button
                          className="next" 
                          variant="contained" 
                          color="primary"  
                          onClick={() => goUp(errors, values)}
                          >next</Button>}

                        <Button
                          className='control'
                          className='next'
                          variant='contained'
                          color='primary'  
                          onClick={() => setIndex(0)}
                          >start again</Button>
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
          

          <div className="cases">
            <Cases cases={cases}/>
          </div>

      </div>
  
   </div>
  )
}

export default Questionnaire;