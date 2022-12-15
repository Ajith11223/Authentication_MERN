import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import * as Yup from "yup"
import RegisterInput from '../../components/inputs/registerInput/RegisterInput'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const registerInfo = {
    full_name: "",
    pu_college: "",
    place: "",
    ph_num: "",
    referalcode: "",
    email: "",
    password: "",
    gender: ""


}

const Register = () => {

    const [signup, setSignup] = useState(registerInfo)
    const { email, password, full_name, pu_college, place, ph_num, referalcode, gender } = signup
    const navigate = useNavigate()
    //handle change
    const handleSignupChange = (e) => {
        const { name, value } = e.target
        setSignup({ ...signup, [name]: value })
    }

    //validation
    const sigunupValidation = Yup.object({

        full_name: Yup.string().required("First Name is required"),
        pu_college: Yup.string().required("college is required"),
        place: Yup.string().required("Place is required"),
        ph_num: Yup.number().required("Phone is required"),
        referalcode: Yup.number(),
        email: Yup.string().required("Email is required").email('Please Enter valid email'),
        password: Yup.string().required("password is required"),
        gender: Yup.string().required("gender is required"),


    })
    const notify = () => toast("Wow so easy!");
    //error
    const [errorr, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    //submit
    const registerSubmit = async () => {
        try {

            const { data } = await axios.post("https://api.bigwave.in/bigwave/api/UserController/signup", signup)
            
            setError("")
            setSuccess(data.message)
            const { message, ...rest } = data
            toast(data.msg)
            setTimeout(() => {
                toast(success);
                
                dispatch({ type: "LOGIN", payload: rest })
                success ? navigate("/login") :navigate("/login") 
            }, 5000)

        } catch (error) {
            setloading(false)
            setSuccess("")
            setError(error.response.data.message)
            toast(errorr)
        }
    }

    return (
        <div className="login">
            <ToastContainer position="top-right"/>
            <div className="login_wrapper">
                <div className="login_wrap">

                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    full_name,
                                    pu_college,
                                    place,
                                    ph_num,
                                    referalcode,
                                    email,
                                    password,
                                    gender
                                }}
                                validationSchema={sigunupValidation}
                                onSubmit={() => {
                                    registerSubmit()
                                    

                                }}
                            >
                                {
                                    (formik) => (
                                        <Form>

                                            <RegisterInput type="text" name="full_name" placeholder='First Name' onChange={handleSignupChange} />
                                            <RegisterInput type="text" name="pu_college" placeholder='PU-College' onChange={handleSignupChange} />
                                            <RegisterInput type="text" name="place" placeholder='Place' onChange={handleSignupChange} />
                                            <RegisterInput type="tel" name="ph_num" placeholder='Phone' onChange={handleSignupChange} />
                                            <RegisterInput type="tel" name="referalcode" placeholder='Referal code' onChange={handleSignupChange} />
                                            <RegisterInput type="email" name="email" placeholder='Email' onChange={handleSignupChange} />
                                            <RegisterInput type="password" name="password" placeholder='Password' onChange={handleSignupChange} />
                                            <div style={{ padding: "10px", display: "flex" }}>
                                                <label for="cars">Select Gender</label>
                                                <select name="gender" id="gender" onChange={handleSignupChange}  >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>

                                                </select>
                                            </div>

                                            <button type='submit' className='blue_btn'>Submit</button>
                                            {errorr && <div className='error_text'>{toast(errorr)}</div>}
                                            {success && <div className='success_text'>{toast(success)}</div>}
                                        </Form>
                                    )
                                }
                            </Formik>

                            <div className="sign_splitter"></div>
                            <Link to="/login" className='forgot_password'>Already have an account ?</Link>
                           
                            {/* <button className="blue_btn open_signup" >Create New Account</button> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register