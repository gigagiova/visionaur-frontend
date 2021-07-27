import { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from "../components/NavBar"
import ChangePropic from '../components/ChangePropic'
import axiosInstance from '../API/axios'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/image-crop.css'
import '../styles/popup.css'


const ProfileSetup = () => {
    
    const [username, setUsername] = useState('username')
    const [bio, setBio] = useState('')    
    const user = useSelector(state => state.user)
    const [blob, setBlob] = useState(null)

    axiosInstance.get('user/account/')
    .then(res => console.log(res))

    const updateProfile = e => {
        e.preventDefault()
        let form = new FormData()
        form.append('username', username)
        form.append('bio', bio)
        form.append('profile_pic', blob, `${username}_propic.png`)
        console.log(form)

        axiosInstance.put('/user/account/', form, {headers: {'Content-Type': 'multipart/form-data',}})
    }

    return (
        <>
        <NavBar title='Profile Setup'/>
        <div className="page">
            <form>
                <ChangePropic setBlob={setBlob}/>
                <h1 style={{margin: "0"}}>{user?.first_name} {user?.last_name}</h1>
                <input className="profile-input" type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
                <textarea value={bio} onChange={e => setBio(e.target.value)} style={{}} maxLength="256" placeholder="write something about you"/>
                <button onClick={updateProfile}>Update</button>
            </form>
        </div>
        </>
    )
}

export default ProfileSetup