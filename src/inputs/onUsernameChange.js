import '../styles/profile.css'
import axiosInstance from '../API/axios'


const onUsernameChange = (e, set, setValid) => {
    const newUsername = e.target.value.replace(/[^a-zA-Z0-9.]/, '').toLocaleLowerCase()
    set(newUsername)
    axiosInstance.post('users/check-username/', {username: newUsername})
    .then(res => {
        if (res.data.available) setValid(true)
        else setValid(false)
    })
}

export default onUsernameChange