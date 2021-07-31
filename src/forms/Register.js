import { useState } from 'react'
import axiosInstance from '../API/axios'
import errorDict from '../API/errorDict'
import { emailRE } from './inputChecks'
import { useDispatch } from 'react-redux'
import { popupActions, userActions } from '../store/redux'
import { useHistory } from 'react-router-dom'


const Register = () => {
    
    const [email, setEmail] = useState('')
    const [firstName, setFN] = useState('')
    const [lastName, setLN] = useState('')
    const [password, setPassword] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [FNValid, setFNValid] = useState(false)
    const [LNValid, setLNValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [formValid, setFormalid] = useState(false)
    const [error, setError] = useState(null)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const handleEmailChange = event => {
        setEmail(event.target.value)
        const validE = emailRE.test(event.target.value)
        setEmailValid(validE)
        setFormalid(validE && FNValid && LNValid && passwordValid)
    }

    const handleFNChange = event => {
        if(event.target.value.length <= 35){
            setFN(event.target.value)
        }
        if(event.target.value.length > 1) {
            setFNValid(true)
            setFormalid(emailValid && LNValid && passwordValid)
        } else {
            setFNValid(false)
            setFormalid(false)
        }
    }

    const handleLNChange = event => {
        if(event.target.value.length <= 35){
            setLN(event.target.value)
        }
        if(event.target.value.length > 1) {
            setLNValid(true)
            setFormalid(emailValid && FNValid && passwordValid)
        } else {
            setLNValid(false)
            setFormalid(false)
        }
    }

    const handlePasswordChange = event => {
        if(event.target.value.length <= 250){
            setPassword(event.target.value)
        }
        if(event.target.value.length > 5) {
            setPasswordValid(true)
            setFormalid(emailValid && FNValid && LNValid)
        } else {
            setPasswordValid(false)
            setFormalid(false)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        axiosInstance.post('/user/register/', {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "password": password
        })
        .then(response => {
            if (response.data.error){
                setError(errorDict[response.data.error])
                setTimeout(() => setError(null), 3000)
            } else {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)

                dispatch(userActions.login(response.data))
                dispatch(popupActions.changePopup({content: null}))
                history.push("/edit-profile")
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h2 className="popup-title">Sign Up</h2>
            <form>
                {error && <p className="error-text">{error}</p>}
                <input type="email" className={emailValid ? "input-valid" : null} value={email} onChange={handleEmailChange} placeholder='Email'/>
                <input type="text" className={FNValid ? "input-valid" : null} style={{width: "43%"}} value={firstName} onChange={handleFNChange} placeholder='First Name'/>
                <input type="text" className={LNValid ? "input-valid" : null} style={{width: "43%"}} value={lastName} onChange={handleLNChange} placeholder='Last Name'/>
                <input type="password" className={passwordValid ? "input-valid" : null} value={password} onChange={handlePasswordChange} autoComplete='on' placeholder='Password'/>
                <button  style={{width: "50%"}} disabled={!formValid} onClick={handleSubmit}>
                    Sign Up
                </button>
            </form>
            <p className="link-text" onClick={() => dispatch(popupActions.changePopup({content: 'Login'}))} style={{margin: "0 0 5%"}}>Already have an account? Sign in</p>
        </div>
    )
}

export default Register