import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import axiosInstance from "../API/axios"
import { mediaBaseURL } from "../API/utils"
import blank from '../assets/blank.png'
import "../styles/cards.css"

const Team = ({team, editable, slug, verb, title="Team"}) => {

    const [add, setAdd] = useState(false)
    const [leave, setLeave] = useState(false)
    const [t, setTeam] = useState(team ? team : [])
    const [newUser, setNewUser] = useState('')
    const history = useHistory()
    useEffect(() => setTeam(team ? team : []), [team])
    const user = useSelector(state => state.user.user)

    const addMember = () => {
        axiosInstance.post('/social/notify-user/', {slug: slug, target: newUser, verb: verb})
        .then(res => {
            setNewUser('')
            setAdd(false)
        })
        .catch(err => console.log(err))
    }

    const leaveTeam = () => {
        if (verb === 'IP') {
            axiosInstance.put('/projects/leave-project/', {slug: slug})
            .then(() => setTeam(prev => prev.filter(m => m.username !== user.username)))
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            {t.map(m => (
                <div key={m.username} className="profile-card">
                    <img alt='profile' className="card-profile-pic" src={m.profile_pic ? mediaBaseURL + m.profile_pic : blank}/>
                    <div className="proile-card-text"  onClick={() => history.push("/user/" + m.username)}>
                        <p className="card-name">{m.name}</p>
                        <p className="card-username">@{m.username}</p>
                    </div>
                    {m.username===user.username && <button onClick={e => setLeave(prev => !prev)}>{leave ? "close" : "leave"}</button>}
                </div>
            ))}
            {leave && <p className="link-text" onClick={leaveTeam}>leave team</p>}
            {add && <input placeholder="username" value={newUser} onChange={e => setNewUser(e.target.value)}/>}
            {editable && 
                (add ?  
                <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button style={{marginRight: "1em"}} onClick={addMember}>Add</button>
                    <span style={{cursor: "pointer"}} onClick={() => setAdd(p => !p)}>close</span>
                </div>: 
                <p style={{cursor: "pointer", margin: "0.5em", textAlign: "center"}} onClick={() => setAdd(p => !p)}>Add member</p>)}
        </div>
    )
}

export default Team