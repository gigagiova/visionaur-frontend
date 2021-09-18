import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axiosInstance from "../API/axios"
import parse from "html-react-parser"
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/columns.css'
import Team from '../components/Team'
import { mediaBaseURL } from '../API/utils'
import blank from '../assets/blank.png'
import { popupActions } from '../store/redux'
import ProjectsList from '../components/ProjectsList'


const Challenge = () => {
    const params = useParams()
    const [challenge, setChallenge] = useState(null)
    const [editable, setEditable] = useState(false)
    const [image, setImage] = useState(blank)
    const [tab, setTab] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.user?.username)

    useEffect(() => {
        axiosInstance.get(`challenges/${params.slug}`)
        .then(res => {
            setChallenge(res.data)
            if (res.data.organizers.some(m => m.username === username)) setEditable(true)
            if (res.data.image) setImage(mediaBaseURL + res.data.image)
        })
        .catch(err => console.log(err))
    }, [params.slug, username])

    const toggleWaiting = () => {
        axiosInstance.post('/challenges/toggle-waiting/', {challenge_slug: params.slug})
        .then(res => setChallenge(prev => {return {...prev, looking_for_team: res.data}}))
        .catch(err => console.log(err))
    }

    return (
        <>
            <NavBar title={params.slug} rightButton={editable ? {text: "Edit", onClick: () => history.push(`/edit-challenge/${params.slug}`)} : null}/>
            <div className="page"  style={{textAlign: "center"}}>
                <div className="profile-header">
                    <img alt='challenge' className="profile-picture" src={image}/>
                    <div className="right-div">
                        <span className="name">{challenge?.title}</span>
                        <p style={{textAlign: "left"}}><strong>Deadline:</strong> {challenge?.deadline}</p>
                        <p className="link-text" style={{textAlign: "left"}} onClick={() => dispatch(popupActions.changePopup({content: "SubmitProject", data: {challenge_slug: params.slug}}))}>Apply now</p>
                    </div>
                </div> 
                <div className="profile-tabs">
                    <span className={tab == 0 ? "tab-selected" : undefined} onClick={() => setTab(0)}>OVERVIEW</span>
                    <span className={tab == 1 ? "tab-selected" : undefined} onClick={() => setTab(1)}>PARTICIPANTS</span>
                    <span className={tab == 2 ? "tab-selected" : undefined} onClick={() => setTab(2)}>DISCUSSION</span>
                </div>
                <div className="left-column">
                    { tab === 0 && 
                        <div className="bio">{parse(challenge?.description ? challenge?.description : '')}</div>
                    }
                    { tab === 1 &&
                        <ProjectsList list={challenge?.subscribed_projects}/>
                    }
                </div>
                <div className="right-column">
                    { tab == 0 && 
                        <Team team={challenge?.organizers} editable={editable} slug={params.slug} root="/challenges"/>
                    }
                    { tab == 1 &&
                        <div>
                            <Team team={challenge?.looking_for_team} title={"people looking for teammates"}/>
                            <button onClick={toggleWaiting}>{challenge.looking_for_team.some(l => l.username === username) ? "Leave" : "Join"}</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Challenge