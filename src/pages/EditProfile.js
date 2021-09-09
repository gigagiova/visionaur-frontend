import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from "../components/NavBar"
import ChangePropic from '../inputs/ChangePropic'
import axiosInstance from '../API/axios'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/image-crop.css'
import '../styles/popup.css'
import onUsernameChange from '../inputs/onUsernameChange'
import { Redirect, useHistory } from 'react-router-dom'
import { userActions } from '../store/redux'
import SkillsList from '../components/SkillsList'


const EditProfile = () => {
    
    const user = useSelector(state => state.user.user)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')    
    const [blob, setBlob] = useState(null)
    const [usernameValid, setUsernameValid] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.username) setUsername(user.username)
        if (user?.name) setName(user.name)
        if (user?.bio) setBio(user.bio)

        // create a copy of the skills to edit them
        // we depend on the username to not cause rerenders when we add temporary skills
        dispatch(userActions.editSkills())
        // delete the temporary copy on unmount
        return () => dispatch(userActions.finishEdit())
    }, [user.username, user.name, user.bio, dispatch])

    useEffect(() => {

    }, [user.username])

    const updateProfile = e => {
        e.preventDefault()
        let form = new FormData()
        form.append('username', username)
        form.append('bio', bio)
        form.append('name', name)
        if (blob) form.append('profile_pic', blob, `${username}_propic.png`)
        // not the best but works for now
        form.append('stringified_skills', JSON.stringify(user.tempSkills))

        axiosInstance.put('/users/my-account/', form, {headers: {'Content-Type': 'multipart/form-data',}})
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
                <ChangePropic setBlob={setBlob} profile={true}/>
                <input className="underline-input" onChange={e => setName(e.target.value.replace(/[^a-zA-Z\s]/, ''))} value={name}/>
                <input 
                    className= "underline-input" style={ usernameValid ? {} : {borderBottom: "2px solid lightcoral"}} 
                    type="text" value={username} onChange={e => onUsernameChange(e, setUsername, setUsernameValid)}
                />
                <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength="256" placeholder="write something about you"/>
                <SkillsList list={user.tempSkills} edit={true}/>
                <button onClick={updateProfile}>Update</button>
            </form>
        </div>
        </>
    )
}

export default EditProfile