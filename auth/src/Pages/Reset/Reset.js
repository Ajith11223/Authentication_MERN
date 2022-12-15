import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Reset.css'
import LoginInput from '../../components/inputs/loginInputs/LoginInput'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const resepass = {
    newPassword: "",
    confirmPassword:"",
    id:"",
  
}

const Reset = () => {
    const {user} = useSelector((state)=>({...state}))
   resepass.id=user.state.json.id

    const [reset, setReset] = useState(resepass)
    const { newPassword,confirmPassword } = reset
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //error success
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setloading] = useState(false)

   
    //handle change
    const handleReset = (e) => {
        const { name, value } = e.target
        setReset({ ...reset, [name]: value })
    }

    //validation
    const passwordValidation = Yup.object({
        newPassword: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Confirm Password is required"),
        

    })

// login submit
const resetPass =async()=>{

   if(reset.newPassword === reset.confirmPassword){
    try {
        const {data} = await axios.put("https://api.bigwave.in/bigwave/api/UserController/forgot_password",reset)
        setError("")
        console.log(data,"yesssssssssssssss");
        data.json.verified === "yes"?toast("Password changed successfull"):toast("Password changed failed")
        setSuccess(data.json.verified)
        console.log(data.json.verified)
        
        
        setTimeout(() => {
            dispatch({ type: "LOGIN", payload: data })
            data.json.verified === "yes" ? navigate("/login") :navigate("/verify") 
        }, 2000)
    } catch (error) {
        setError(error.response.data.message)
        navigate("/login")
        toast(error.response.data.message)
    }

   }else{
    toast("Password doesn't match")
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
                                    newPassword,
                                    confirmPassword
                                
                                }}
                                validationSchema={passwordValidation}
                                onSubmit={()=>{
                                resetPass()
                                }}
                            >
                                {
                                    (formik) => (
                                        <Form>
                                            <LoginInput type="password" name="newPassword" placeholder='Enter New Password' onChange={handleReset} />
                                            <LoginInput type="password" name="confirmPassword" placeholder='Enter Confirm Password' onChange={handleReset} />

                                            <button type='submit' className='blue_btn'>Reset</button>
                                        </Form>
                                    )
                                }
                            </Formik>

                            {error && <div>{error}</div>}
                            
                            
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Reset