import React, { useState, useRef, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Button } from '@material-ui/core';
import Cases from '../Cases'
// import * as yup from 'yup';
import './Questionnaire.css'
import { v4 as uuidv4 } from 'uuid';

const Questionnaire = ({ questions }) => {
  const [cases, setCases] = useState([]);
  const [index, setIndex] = useState(0);
  let currentQuestion = questions[index];
  const inputRef = useRef('');
  
  useEffect(() => {
    inputRef.current.focus();
    setCases(JSON.parse(localStorage.getItem('data'))|| [])
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem('data', JSON.stringify(cases));
  }, [cases]);

  const goUp= (error, values) => {
    if(error[currentQuestion.category] || !values['Target']){
      return false
    }
    inputRef.current.focus();
    inputRef.current.value = ''
    if(index <= (questions.length -2) ) {
      setIndex(index + 1)
    }
  }

  const goDown= () => {
    inputRef.current.focus();
    inputRef.current.value = ''
    if(index > 0) {
      setIndex(index - 1)
    }
  }

  const removeCase = (e) => {
    console.log(e.target.id)
    setCases(cases.filter(entry => entry.id !== e.target.id));
  }

  const injectCases = () => {
      
    return cases.map((entry, i) => {
      return (
          <article className="case" key={i}>
                <button 
                  id={entry.id}
                  onClick={(e)=> removeCase(e)}
                  className="remove">X</button>
                <h4 className="bold"> Product case {i + 1}</h4>
                <p>
                <span className="small"> [ {entry['Target']} ] </span> at
                <span className="small"> [ {entry['Company type']} ] </span>  use
                <span className="small"> [ {entry['Product name']} ]</span> in order to
                <span className="small"> [ {entry['Action']} ]</span>
                <span className="small"> [ {entry['Task']} ] </span>
                </p>
          </article>
      )
    })
  }

  return (
    <div className='parent'>

      <h1 className='case-title'>Theorem</h1>
      <h1 className='case-title'>Use Case</h1>

      <div className="cases">
      {injectCases()}
      </div>

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
                  initialValues={{ [currentQuestion.category]: '', id: ''}}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    values.id = uuidv4()
                    setSubmitting(true);
                    setCases([...cases, {... values }])
                    localStorage.setItem('data', JSON.stringify([...cases, values ]));
                    
                    setSubmitting(false);
                    resetForm()
                  }}

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

                        {index === (questions.length -1) && <Button
                          className='control'
                          className='next'
                          variant='contained'
                          color='primary'  
                          onClick={() => setIndex(0)}
                          >start again</Button>}
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