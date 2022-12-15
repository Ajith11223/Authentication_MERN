import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Verify.css'
import LoginInput from '../../components/inputs/loginInputs/LoginInput'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';





const verifyOtp = {
    verification_code: "",
    id:""
  
}

const Verify = () => {
    const {user} = useSelector((state)=>({...state}))

   
    verifyOtp.id=user.state.json.id
    const [otp, setOtp] = useState(verifyOtp)
    const { verification_code } = otp
    console.log(otp);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //error success
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setloading] = useState(false)

    
    //handle change
    const handleVerify = (e) => {
        const { name, value } = e.target
        setOtp({ ...otp, [name]: value })
    }

    //validation
    const otpValidation = Yup.object({
        verification_code: Yup.number().required("otp is required")

    })

// login submit
const otpSubmit=async()=>{

    try {
        const {data} = await axios.post("https://api.bigwave.in/bigwave/api/UserController/verify",otp)
     
        setError("")
        setSuccess(data.message)
        toast(data.message);
        toast(data.json.message);
        
       
        setTimeout(() => {
            dispatch({ type: "LOGIN", payload: data })
            data.status === "success" ? navigate("/reset") : navigate("/forgot")
        }, 2000)
    } catch (error) {
        setError(error.response.data.message)
        toast(error.response.data.message)
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
                    <span>We've sent email with code to hashmiajith@gmail.com,Enter the 5-digit code from your email.</span> 
                        {/* {/* <img style={{ width: "230px" }} src={logo} alt="" /> */}
                    </div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    verification_code
                                
                                }}
                                validationSchema={otpValidation}
                                onSubmit={()=>{
                                    otpSubmit()
                                }}
                            >
                                {
                                    (formik) => (
                                        <Form>
                                            <LoginInput type="tel" name="verification_code" placeholder='Otp' onChange={handleVerify} />

                                            <button type='submit' className='blue_btn'>confirm</button>
                                        </Form>
                                    )
                                }
                            </Formik>

                            {error && <div>{error}</div>}
                            <div className="sign_splitter"></div>

                            <button  style={{backgroundColor:"gray",width:"250px"}} className='blue_btn'>Change Email</button>
                            <button style={{backgroundColor:"gray",width:"250px"}} className='blue_btn'>Send Code again</button>
                            
                            <Link to={"/login"}> Logout</Link>
                            
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Verify