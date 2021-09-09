import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

    useEffect(() => {
        axiosInstance.get(`projects/${params.slug}`)
        .then(res => setProject(res.data))
        .catch(err => console.log(err))
    }, [params.slug])

    return (
        <>
            <NavBar title={params.slug}/>
            <div className="page"  style={{textAlign: "center"}}>
                <div className="left-column">
                    <span className="name">{project?.title}</span>
                    <p className="bio">{project?.description}</p>
                </div>
                <div className="right-column">
                    <button onClick={() => window.open("//" + project?.repository)}>repository</button>
                    <Tags list={project?.skills_needed}/>
                    <Team team={project?.team}/>
                </div>
            </div>
        </>
    )
}

export default Project