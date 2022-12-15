import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import './Login.css'
import LoginInput from '../../components/inputs/loginInputs/LoginInput'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




const loginInfos = {
    email: "",
    password: ""
}

const Login = () => {

    const [login, setLogin] = useState(loginInfos)
    const { email, password } = login
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //error success
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setloading] = useState(false)

    
    //handle change
    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    //validation
    const loginValidation = Yup.object({
        email: Yup.string().required("Email is required").email('Please Enter valid email'),
        password: Yup.string().required("password is required")


    })

// login submit
const loginSubmit=async()=>{
 
    try {
        const {data} = await axios.post("https://api.bigwave.in/bigwave/api/UserController/login",login)
        setError("")
        setSuccess(data.message)
        const { message, ...rest } = data
        // toast(message)
        // console.log(data.message,"lll");
        toast(data.message)
        setTimeout(() => {
            dispatch({ type: "LOGIN", payload: data })
            toast(data.status)
            data.status === "success" ? navigate("/") :navigate("/login") 
        }, 2000)
    } catch (error) {
        setError(error.response.data.message)
        // console.log(error.response.data.message)
        toast(error.response.data.message)

        navigate("/login")
    }

}


//navigate 
const create =()=>{
    navigate("/signup")
}

    return (
        <div className="login">
           <ToastContainer position="top-right"/>
            <div className="login_wrapper">
                <div className="login_wrap">
                    <div className="login_1">
                        <img style={{ width: "230px" }} src={logo} alt="" />
                        <span style={{padding:"10px"}}>KCET College Predictor 2022</span>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email,
                                    password,
                                }}
                                validationSchema={loginValidation}
                                onSubmit={()=>{
                                   loginSubmit()
                                }}
                            >
                                {
                                    (formik) => (
                                        <Form>
                                            <LoginInput type="text" name="email" placeholder='Email' onChange={handleLoginChange} />
                                            <LoginInput type="password" name="password" placeholder='Password' onChange={handleLoginChange} />

                                            <button type='submit' className='blue_btn'>Log In</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            
                            <Link to="/forgot" className='forgot_password'>Forgot Password ?</Link>
                            {/* {error && <div>{toast(error)}</div>} */}
                            {/* {success && <div>{toast(success)}</div>} */}
                            <div className="sign_splitter"></div>
                            
                            <button className="blue_btn open_signup" onClick={create} >Create New Account</button>
                            
                        </div>
                    </div>
                </div>
               
            </div>
            
        </div>
    )
}

export default Login