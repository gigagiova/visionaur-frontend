import { useState } from 'react'
import axiosInstance from '../API/axios'
import errorDict from '../API/errorDict'
import { emailRE } from './inputChecks'
import { popupActions, userActions } from '../store/redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [formValid, setFormalid] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleEmailChange = event => {
        setEmail(event.target.value)
        const validE = emailRE.test(event.target.value)
        setEmailValid(validE)
        setFormalid(validE && passwordValid)
    }

    const handlePasswordChange = event => {
        if(event.target.value.length <= 250){
            setPassword(event.target.value)
        }
        if(event.target.value.length > 5) {
            setPasswordValid(true)
            setFormalid(emailValid) // since is the only other variable
        } else {
            setPasswordValid(false)
            setFormalid(false)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        axiosInstance.post('/users/login/', {
            "email": email,
            "password": password
        })
        .then(response => {
            console.log(response)
            if (response.data.error){
                setError(errorDict[response.data.error])
                setTimeout(() => setError(null), 3000)
            } else {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access
                dispatch(userActions.login(response.data))
                dispatch(popupActions.changePopup({content: null}))
                history.push("/profile")
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h2 className="popup-title">Log In</h2>
            <form>
                {error && <p className="error-text">{error}</p>}
                <input type="email" className={emailValid ? "input-valid" : null} value={email} onChange={handleEmailChange} placeholder='Email'/>
                <input type="password" className={passwordValid ? "input-valid" : null} value={password} onChange={handlePasswordChange} autoComplete='on' placeholder='Password'/>
                <button  style={{width: "50%"}} disabled={!formValid} onClick={handleSubmit}>
                    Sign In
                </button>
            </form>
            <p className="link-text" style={{margin: "0 0 5%"}} onClick={() => dispatch(popupActions.changePopup({content: 'Register'}))}>Don't have an account? Sign up</p>
        </div>
    )

}

export default Login