import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { mediaBaseURL } from '../API/utils'
import axiosInstance from "../API/axios"
import NavBar from "../components/NavBar"
import ProjectsList from "../components/ProjectsList"
import blank from '../assets/blank.png'



const Explore = () => {

    const [tab, setTab] = useState('projects')
    const [list, setList] = useState([])
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get(tab + '/')
        .then(res => setList(res.data))
        .catch(err => console.log(err))
    }, [tab])

    return (
        <>
            <NavBar title="Explore"/>
            <div className="page">
                <div className="page-tabs" style={{justifyContent: "center"}}>
                    <span className={tab === 'projects' ? "tab-selected" : undefined} onClick={() => setTab('projects')}>PROJECTS</span>
                    <span className={tab === 'challenges' ? "tab-selected" : undefined} onClick={() => setTab('challenges')}>CHALLENGES</span>
                </div>

                <div className="right-column">
                    <h2>Filters</h2>
                </div>
                <div className="left-column">
                    {tab === 'projects' && 
                        <ProjectsList list={list}/>
                    }
                    {tab === 'challenges' && 
                        (list.map(c => 
                            <div key={c.slug} className="challenge-card" onClick={() => history.push("/challenge/" + c.slug)}>
                                <img src={c.image ? mediaBaseURL + c.image : blank} className="card-profile-pic" style={{padding:"0 2em"}}/>
                                <div>
                                    <p className="card-title">{c.title}</p>
                                    <p style={{margin: "0", fontSize: "small"}}><b>deadline: </b>{c.deadline ? c.deadline : "not defined"}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default Explore