import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axiosInstance from "../API/axios"
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/columns.css'
import Team from '../components/Team'
import Tags from '../components/Tags'


const Project = () => {
    const params = useParams()
    const [project, setProject] = useState(null)
    const [editable, setEditable] = useState(false)
    const history = useHistory()
    const username = useSelector(state => state.user.user?.username)

    useEffect(() => {
        axiosInstance.get(`projects/${params.slug}`)
        .then(res => {
            setProject(res.data)
            if (res.data.team.some(m => m.user === username && m.role !== "M")) setEditable(true)
        })
        .catch(err => console.log(err))
    }, [params.slug, username])

    return (
        <>
            <NavBar title={params.slug} rightButton={editable ? {text: "Edit", onClick: () => history.push(`/edit-project/${params.slug}`)} : null}/>
            <div className="page"  style={{textAlign: "center"}}>
                <div className="left-column">
                    <span className="name">{project?.title}</span>
                    <p className="bio">{project?.description}</p>
                </div>
                <div className="right-column">
                    <button onClick={() => window.open("//" + project?.repository)}>repository</button>
                    <Tags list={project?.skills_needed}/>
                    <Team team={project?.team} editable={editable} slug={params.slug}/>
                </div>
            </div>
        </>
    )
}

export default Project