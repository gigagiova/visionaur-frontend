import { useState } from 'react'
import axiosInstance from '../API/axios'
import errorDict from '../API/errorDict'
import { emailRE } from './inputChecks'
import { useDispatch } from 'react-redux'
import { popupActions, userActions } from '../store/redux'
import { useHistory } from 'react-router-dom'
import onUsernameChange from '../inputs/onUsernameChange'


const Register = () => {
    
    const [email, setEmail] = useState('')
    const [firstName, setFN] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [usernameValid, setUsernameValid] = useState(false)
    const [NameValid, setNameValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [formValid, setFormalid] = useState(false)
    const [error, setError] = useState(null)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const handleEmailChange = event => {
        setEmail(event.target.value)
        const validE = emailRE.test(event.target.value)
        setEmailValid(validE)
        setFormalid(validE && NameValid && usernameValid && passwordValid)
    }

    const handleNameChange = event => {
        if(event.target.value.length <= 60){
            setFN(event.target.value.replace(/^\s+|\s(?=\s)|[^a-zA-Z\s]/, ''))
        }
        if(event.target.value.length > 1) {
            setNameValid(true)
            setFormalid(emailValid && usernameValid && passwordValid)
        } else {
            setNameValid(false)
            setFormalid(false)
        }
    }

    const handlePasswordChange = event => {
        if(event.target.value.length <= 250){
            setPassword(event.target.value)
        }
        if(event.target.value.length > 5) {
            setPasswordValid(true)
            setFormalid(emailValid && NameValid && usernameValid)
        } else {
            setPasswordValid(false)
            setFormalid(false)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        axiosInstance.post('/users/register/', {
            "email": email.toLocaleLowerCase(),
            "name": firstName,
            "username": username,
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
                <input type="text" className={NameValid ? "input-valid" : null} value={firstName} onChange={handleNameChange} placeholder='Name'/>
                <input type="text" className={usernameValid ? "input-valid" : null} value={username} onChange={e => onUsernameChange(e, setUsername, setUsernameValid)} placeholder='Username'/>
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