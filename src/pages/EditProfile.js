import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from "../components/NavBar"
import ChangePropic from '../inputs/ChangePropic'
import axiosInstance from '../API/axios'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/image-crop.css'
import '../styles/popup.css'
import ChangeUsername from '../inputs/ChangeUsername'
import { Redirect, useHistory } from 'react-router-dom'
import { userActions } from '../store/redux'
import SkillsList from '../components/SkillsList'


const EditProfile = () => {
    
    const user = useSelector(state => state.user.user)
    const [username, setUsername] = useState('')
    const [FN, setFN] = useState('')
    const [SN, setSN] = useState('')
    const [bio, setBio] = useState('')    
    const [blob, setBlob] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.username) setUsername(user.username)
        if (user?.first_name) setFN(user.first_name)
        if (user?.last_name) setSN(user.last_name)
        if (user?.bio) setBio(user.bio)
    }, [user])

    const updateProfile = e => {
        e.preventDefault()
        let form = new FormData()
        form.append('username', username)
        form.append('bio', bio)
        form.append('first_name', FN)
        form.append('last_name', SN)
        if (blob) form.append('profile_pic', blob, `${username}_propic.png`)
        // not the best but works for now
        form.append('stringified_skills', JSON.stringify(user.skills))

        axiosInstance.put('/user/account/', form, {headers: {'Content-Type': 'multipart/form-data',}})
        .then (res => dispatch(userActions.update(res.data)))
        .catch(err => console.log(err))
        history.push('/profile')
    }

    return (
        <>
        <NavBar title='Profile Setup' leftButton={{text: "Cancel", onClick: () => history.push("/profile")}}/>
        <div className="page">
        {!user && <Redirect to="/"/>}
            <form>
                <ChangePropic setBlob={setBlob}/>
                <input className="name-input" style={{textAlign: "right"}} onChange={e => setFN(e.target.value.replace(/[^a-zA-Z\s]/, ''))} value={FN}/>
                <input className="name-input" style={{textAlign: "left"}} onChange={e => setSN(e.target.value.replace(/[^a-zA-Z\s]/, ''))} value={SN}/>
                <ChangeUsername value={username} onChange={u => setUsername(u)}/>
                <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength="256" placeholder="write something about you"/>
                <SkillsList list={user?.skills} edit={true}/>
                <button onClick={updateProfile}>Update</button>
            </form>
        </div>
        </>
    )
}

export default EditProfile