import { useHistory } from "react-router-dom"
import "../styles/cards.css"

const ProjectsList = ({list}) => {

    const history = useHistory()

    if (!list) return null 

    return (
        <div>
            {list.map(p => (
                <div key={p.slug} className="project-card" onClick={() => history.push("/project/" + p.slug)}>
                    <p className="card-title">{p.title}</p>
                    <p style={{margin: "0", fontSize: "small"}}>{p.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ProjectsList