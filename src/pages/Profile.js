import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import blank from '../assets/blank.png'
import { mediaBaseURL } from '../API/utils'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/columns.css'
import NavBar from '../components/NavBar'
import { Redirect, useHistory } from 'react-router-dom'
import SkillsList from '../components/SkillsList'
import ProjectsList from '../components/ProjectsList'


const Profile = props => {
    
    const [image, setImage] = useState(blank)
    const history = useHistory()

    useEffect(() => {
        if (props.user?.profile_pic) setImage(mediaBaseURL + props.user.profile_pic)
    }, [props.user])

    return (
        <>
            {!props.user && <Redirect to="/"/>}
            <NavBar title={props.user?.username} leftButton={{text: "Edit", onClick: () => history.push("/edit-profile")}}/>
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