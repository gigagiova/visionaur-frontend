import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import blank from '../assets/blank.png'
import { mediaBaseURL } from '../API/utils'
import '../styles/page.css'
import '../styles/profile.css'
import NavBar from '../components/NavBar'
import { Redirect, useHistory } from 'react-router-dom'
import SkillsList from '../components/SkillsList'


const Profile = props => {
    
    const [image, setImage] = useState(blank)
    const history = useHistory()

    useEffect(() => {
        if (props.user?.profile_pic) setImage(mediaBaseURL + props.user.profile_pic)
    }, [props.user])

    console.log(props.user)

    return (
        <>
            {!props.user && <Redirect to="/"/>}
            <NavBar title={props.user?.username} leftButton={{text: "Edit", onClick: () => history.push("/edit-profile")}}/>
            <div className="page">
                <img alt='profile' className="profile-picture" src={image}/>
                <span className="name">{props.user?.first_name} {props.user?.last_name}</span>
                <p className="bio">{props.user?.bio}</p>
                <button style={{margin: "3% auto", display: "block"}}>New project</button>
                <SkillsList list={props.user?.skills}/>
            </div>
        </>
    )
}

const mapStateToProps = state => { return {user: state.user.user}}

export default connect (mapStateToProps)(Profile)