import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Forgot.css'
import LoginInput from '../../components/inputs/loginInputs/LoginInput'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const emailInfo = {
    email: ""
  
}

const Forgot = () => {

    const [forgot, setForgot] = useState(emailInfo)
    const { email } = forgot
    console.log(forgot);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //error success
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setloading] = useState(false)

    
    //handle change
    const handleForgot = (e) => {
        const { name, value } = e.target
        setForgot({ ...forgot, [name]: value })
    }

    //validation
    const emailvalidation = Yup.object({
        email: Yup.string().required("Email is required").email('Please Enter valid email',forgot),

    })

// login submit
const emailSubmit=async()=>{

    try {
        const {data} = await axios.post("https://api.bigwave.in/bigwave/api/UserController/reenter_email",forgot)
        setError("")
        setSuccess(data.message)
        
       toast(data.message);
       toast(data.msg);
       
        setTimeout(() => {
            dispatch({ type: "LOGIN", payload: data })
            data.status === "success" ? navigate("/verify") :navigate("/login") 
        }, 2000)
    } catch (error) {
        setError(error.response.data.message)
        console.log(error.response.data)
        navigate("/login")
    }

}




    return (
        <div className="login">
           <ToastContainer position="top-right"/>

            <div className="login_wrapper">
                <div className="login_wrap">
                   
                    <div className="login_2">
                        <div className="login_2_wrap">
                    <div >
                        <h1>Confirm your email</h1>
                        <div className="sign_splitter"></div>
                    </div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email
                                
                                }}
                                validationSchema={emailvalidation}
                                onSubmit={()=>{
                                    emailSubmit()
                                }}
                            >
                                {
                                    (formik) => (
                                        <Form>
                                            <LoginInput type="text" name="email" placeholder='Email' onChange={handleForgot} />

                                            <button type='submit' className='blue_btn'>Submit</button>
                                        </Form>
                                    )
                                }
                            </Formik>

                            {/* {error && <div>{error}</div>} */}
                            
                            
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Forgot