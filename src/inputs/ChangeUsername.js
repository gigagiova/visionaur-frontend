import '../styles/profile.css'
import axiosInstance from '../API/axios'
import { useState } from 'react'


const ChangeUsername = props => {

    const [valid, setValid] = useState(true)

    const onUsernameChange = e => {
        props.onChange(e.target.value.replace(/[^a-zA-Z0-9\.]/, ''))
        axiosInstance.post('user/check-username/', {username: e.target.value})
        .then(res => {
            if (res.data.available) setValid(true)
            else setValid(false)
        })
    }

    return (
        <input className= "profile-input" style={ valid ? {} : {borderBottom: "2px solid lightcoral"}} type="text" value={props.value} onChange={onUsernameChange}/>
    )
}

export default ChangeUsername