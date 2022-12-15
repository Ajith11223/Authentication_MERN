import React from 'react'
import './RegisterInput.css'
import { ErrorMessage, useField } from 'formik'

const RegisterInput = ({placeholder,...props}) => {

    const [field,meta] = useField(props)

  return (
    <div className='input_wrap'>

        <div>
            {
                meta.touched && meta.error && <ErrorMessage name={field.name}/>
            }
        </div>
         <input type={field.type} 
         name={field.name}
         placeholder={placeholder} 
         {...field} {...props}/>
        
    </div>
  )
}

export default RegisterInput