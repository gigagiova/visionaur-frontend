import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import blank from '../assets/blank.png'
import { mediaBaseURL } from '../API/utils'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/columns.css'
import NavBar from '../components/NavBar'
import { Redirect, useHistory } from 'react-router-dom'
import SkillsList from '../components/SkillsList'
import ProjectsList from '../components/ProjectsList'
import axiosInstance from '../API/axios'
import { userActions } from '../store/redux'

const Profile = props => {
    
    const [image, setImage] = useState(blank)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (props.user?.profile_pic) setImage(mediaBaseURL + props.user.profile_pic)
    }, [props.user])

    useEffect(() => {
        // update the user instance

        axiosInstance.get('users/my-account/')
        .then(res => dispatch(userActions.login(res.data)))
    }, [])

    return (
        <>
            {!props.user && <Redirect to="/"/>}
            <NavBar title={props.user?.username} leftButton={{text: "Edit", onClick: () => history.push("/edit-profile")}} rightButton={{text: "Log Out", onClick: () => dispatch(userActions.logout())}}/>
            <div className="page">
                <div className="profile-header">
                    <img alt='profile' className="profile-picture" src={image}/>
                    <div className="right-div">
                        <span className="name">{props.user?.name}</span>
                        <p className="bio">{props.user?.bio}</p>
                    </div>
                </div>
                
                <div className="left-column">
                    <button style={{margin: "3% auto", display: "block"}} onClick={() => history.push("/new-project")}>New project</button>
                    <ProjectsList list={props.user?.projects}/>
                    <p className="link-text" style={{margin: "1em 0"}} onClick={() => history.push("/new-challenge")}>host a challenge</p>
                </div>
                <div className="right-column">
                    <SkillsList list={props.user?.skills}/>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => { return {user: state.user.user}}

export default connect (mapStateToProps)(Profile)