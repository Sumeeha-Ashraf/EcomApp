import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const { email, password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', { email, password })
            setUser({ ...user, err: '', success: res.data.msg })

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div>
            <section className="ftco-section">
                <div className="container" >
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="img abc" >
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Sign In</h3>
                                            {err && showErrMsg(err)}
                                            {success && showSuccessMsg(success)}
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} className="signin-form">
                                        <div className="form-group mb-3">
                                            <label className="label" for="name">Email</label>
                                            <input required type="email" name="email" className="form-control" placeholder="Enter your email id" id="email" value={email} name="email" onChange={handleChangeInput} required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" for="password">Password</label>
                                            <input required type="password" name="password" className="form-control" placeholder="Enter your password" id="password"
                                                value={password} name="password" onChange={handleChangeInput} required />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50 text-md-right">
                                                <Link to="/forgot_password">Forgot your password?</Link>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="text-center">Not a member? <Link to="/register">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>




    )
}

export default Login
