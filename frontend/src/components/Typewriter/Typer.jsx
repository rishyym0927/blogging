import React from 'react'
import { Typewriter, Cursor, useTypewriter } from "react-simple-typewriter";
const Typer = () => {
  return (
    <div className='flex flex-col gap-8 font-bold'>
          <h1 className=' text-3xl md:text-5xl text-white'>
        Hey ! I'm Rishyy{' '}</h1>
        <span className='text-3xl md:text-5xl text-pink-500'>
         
          <Typewriter
            words={['From IIIT LUCKNOW🤑', 'Not IIT Lucknow for sure 😭','From IT Branch 2nd Year😇', 'I Do Cp and Web Dev ']}
            loop={0}
            cursor
            cursorStyle='...'
            typeSpeed={80}
            deleteSpeed={80}
            delaySpeed={1000}
           
          />
        </span>
      
    </div>
  )
}

export default Typer