import React from 'react'
import './Cases.css';

 const Cases = ({ cases }) => {

    const injectCases = (cases) => {
      console.log(cases)
      if(cases){
        return cases.map((entry, i) => {
          return (
              <article className="case">
                    <h4 className="bold"> Product case {i +1}</h4>
                    <p>
                    <span className="small"> {entry['Target']} at</span> 
                    <span className="small">  {entry['Company type']} use </span>  
                    <span className="small">  {entry['Product name']} in order to  </span>
                    <span className="small"> {entry['Action']} </span>
                    <span className="small"> {entry['Task']} </span>
                    </p>
              </article>
          )
        })
      }
    }

  return (
    <>
      {injectCases()}
    </>
  )
}

export default Cases;