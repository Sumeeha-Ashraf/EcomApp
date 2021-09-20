import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
 <div>
            <div class="container">

                <div class="row justify-content-center mt-5">
                    <div class="col-md-12 col-lg-10">
                        <div class="wrap d-md-flex">
                            <div class="img">
                            </div>
                            <div class="login-wrap p-4 p-md-5">
                                <div class="d-flex">
                                    <div class="w-100">
                                        <h3 class="mb-4">Sign Up</h3>
                                         {err && showErrMsg(err)}{success && showSuccessMsg(success)}
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} class="signin-form" enctype="multipart/form-data">

                                    <div class="form-group mb-3">
                                        <label class="label" for="name">Username</label>
                                        <input required type="text" name="name" id="name" class="form-control" placeholder="Username" value={name} onChange={handleChangeInput} required />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="label" for="name">Email</label>
                                        <input required type="email" name="email" id="email" class="form-control" placeholder="email" value={email} onChange={handleChangeInput} required />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="label" for="password">Password</label>
                                        <input required type="password" name="password" id="password" class="form-control" placeholder="Password" value={password} onChange={handleChangeInput} required />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="label" for="password">Confirm Password</label>
                                        <input required type="password" name="cf_password" id="cf_password" class="form-control" placeholder="Retype Password" value={cf_password} onChange={handleChangeInput} required />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="form-control btn btn-primary rounded submit px-3">Sign Up</button>
                                    </div>
                                    </form>
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   )
}
        export default Register
