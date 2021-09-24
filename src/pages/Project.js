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
import Update from '../components/Update'


const Project = () => {
    const params = useParams()
    const [project, setProject] = useState(null)
    const [editable, setEditable] = useState(false)
    const [updateText, setUpdateText] = useState(null)
    const history = useHistory()
    const username = useSelector(state => state.user.user?.username)

    useEffect(() => {
        axiosInstance.get(`projects/${params.slug}`)
        .then(res => {
            setProject(res.data)
            if (res.data.team.some(m => m.username === username && m.role !== "M")) setEditable(true)
        })
        .catch(err => console.log(err))
    }, [params.slug, username])
    
    const postUpdate = () => {
        if (updateText.length === 0) return
        
        axiosInstance.post('projects/post-update/', {text: updateText, slug: params.slug})
        .then(res => { setUpdateText(null); setProject(prev => ({...prev, updates: [res.data, ...prev.updates]}))})
        .catch(err => console.log(err))
    }

    return (
        <>
            <NavBar title={params.slug} rightButton={editable ? {text: "Edit", onClick: () => history.push(`/edit-project/${params.slug}`)} : null}/>
            <div className="page"  style={{textAlign: "center"}}>
                <div className="left-column">
                    <span className="name">{project?.title}</span>
                    <p className="bio">{project?.description}</p>
                    { editable && updateText !== null && 
                        <>
                            <textarea value={updateText} onChange={ e => setUpdateText(e.target.value)} placeholder="write an update" style={{width: "-webkit-fill-available"}}/>
                            <div style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "flex-end", gap: "2em"}}>
                                <p onClick={() => setUpdateText(null)} className="link-text" style={{padding: "0.5em 0"}}>cancel</p>
                                <button onClick={postUpdate} style={{display: "block", margin: "0"}}>post</button>
                            </div>
                        </>
                    }
                    { editable && updateText === null && 
                        <button onClick={() => setUpdateText('')} style={{display: "block", margin: "1em 0 0 auto"}}>new update</button>
                    }
                    {project?.updates && project.updates.map(u => <Update key={u.id} data={u}/>)}
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