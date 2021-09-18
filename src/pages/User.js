import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axiosInstance from "../API/axios"
import SkillsList from '../components/SkillsList'
import blank from '../assets/blank.png'
import { mediaBaseURL } from '../API/utils'
import '../styles/page.css'
import '../styles/profile.css'
import ProjectsList from '../components/ProjectsList'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const User = () => {

    const params = useParams()
    const username = useSelector(state => state.user.user.username)
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(blank)

    useEffect(() => {
        // check, since we are going to redirect to our profile if this is our account
        if (params.username !== username) {
            axiosInstance.get(`users/${params.username}`)
            .then(res => {
                if (res.data.profile_pic) setImage(mediaBaseURL + res.data.profile_pic)
                setUser(res.data)
            })
            .catch(err => console.log(err))
        }

    }, [params.username])

    return (
        <>
            {(params.username === username) && <Redirect to="/profile"/>}
            <NavBar title={params.username}/>
            <div className="page">
                <div className="profile-header">
                    <img alt='profile' className="profile-picture" src={image}/>
                    <div className="right-div">
                        <span className="name">{user?.name}</span>
                        <p className="bio">{user?.bio}</p>
                    </div>
                </div> 
                <div className="left-column">
                    <ProjectsList list={user?.projects}/>
                </div>
                <div className="right-column">
                    <SkillsList list={user?.skills}/>
                </div>
            </div>
        </>
    )

}

export default User