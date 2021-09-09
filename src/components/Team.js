import { useHistory } from "react-router-dom"
import blank from '../assets/blank.png'
import "../styles/cards.css"

const Team = ({team}) => {

    const history = useHistory()

    if (!team) return null

    return (
        <div>
            <h2>Team</h2>
            {team.map(m => (
                <div key={m.user} className="profile-card" onClick={() => history.push("/user/" + m.user)}>
                    <img alt='profile' className="card-profile-pic" src={m.profile_pic ? m.profile_pic : blank}/>
                    <div className="proile-card-text">
                        <p className="card-name">{m.name}</p>
                        <p className="card-username">@{m.user}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Team