import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axiosInstance from "../API/axios"
import { mediaBaseURL } from "../API/utils"
import blank from '../assets/blank.png'
import "../styles/cards.css"

const Team = ({team, editable, slug, root='/projects', title="Team"}) => {

    const [add, setAdd] = useState(false)
    const [t, setTeam] = useState(team ? team : [])
    const [newUser, setNewUser] = useState('')
    const history = useHistory()
    useEffect(() => setTeam(team ? team : []), [team])

    const addMember = () => {
        axiosInstance.post(root + '/add-member/', {slug: slug, user: newUser})
        .then(res => {
            setTeam(prev => [...prev, res.data])
            setNewUser('')
            setAdd(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>{title}</h2>
            {t.map(m => (
                <div key={m.username} className="profile-card" onClick={() => history.push("/user/" + m.username)}>
                    <img alt='profile' className="card-profile-pic" src={m.profile_pic ? mediaBaseURL + m.profile_pic : blank}/>
                    <div className="proile-card-text">
                        <p className="card-name">{m.name}</p>
                        <p className="card-username">@{m.username}</p>
                    </div>
                </div>
            ))}
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