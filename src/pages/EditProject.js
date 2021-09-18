import NavBar from "../components/NavBar"
import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import '../styles/page.css'
import axiosInstance from "../API/axios"
import { urlRE } from "../forms/inputChecks"
import ChooseSkills from "../components/ChooseSkills"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { popupActions } from "../store/redux"


const EditProject = ({isNew}) => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [selectedSkills, setSelectedSkills] = useState([])
    const [titleValid, setTitleValid] = useState(true)
    const [linkValid, setLinkValid] = useState(true)

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        if (!isNew) {
            axiosInstance.get(`/projects/${params.slug}`)
            .then(res => {
                setTitle(res.data.title)
                setSlug(res.data.slug)
                setDescription(res.data.description)
                setLink(res.data.repository)
                setSelectedSkills(res.data.skills_needed.map(s => s.id))
            })
            .catch(err => console.log(err))
        }
    }, [])

    const onTitleChange = e => {
        const newTitle = e.target.value.replace(/^\s+|\s(?=\s)|[^a-zA-Z0-9\s]/, '')
        const newSlug = newTitle.replace(/\s/g, '-')
        setTitle(newTitle)
        setSlug(newSlug)
        axiosInstance.post('projects/check-slug/', {slug: newSlug})
        .then(res => {
            if (res.data.available) setTitleValid(true)
            else setTitleValid(false)
        })
    }

    const onLinkChange = e => {
        // if the link is not present it is valid, since it is not required
        setLinkValid(e.target.value ? urlRE.test(e.target.value) : true)
        setLink(e.target.value)
    }

    const submit = e => {
        e.preventDefault()
        const data = {
            title: title,
            description: description,
            slug: slug,
            repository: link,
            skills_list: selectedSkills
        }
        if (isNew) {
            axiosInstance.post('/projects/', data)
            .then(res => history.push("/project/" + res.data.slug))
            .catch(err => console.log(err))
        } else {
            axiosInstance.put(`/projects/${params.slug}/`, data)
            .then(res => history.push("/project/" + res.data.slug))
            .catch(err => console.log(err))
        }
    }

    return(
        <>
            <NavBar title={isNew ? 'New Project' : params.slug}
                leftButton={{text: "Cancel", onClick: () => history.push(`/project/${params.slug}/`)}} 
                rightButton={{text: "Delete", onClick: () => dispatch(popupActions.changePopup({content: 'DeleteProject', data: {slug: params.slug}}))}}
            />
            <div className="page">
                <form>
                    <input className="underline-input" onChange={onTitleChange} value={title} style={ titleValid ? {} : {borderBottom: "2px solid lightcoral"}} placeholder="Title"/>
                    <p style={{margin: "0", minHeight: "1em"}}>{slug}</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the project"/>
                    <input className="underline-input" onChange={onLinkChange} value={link} style={ linkValid ? {} : {borderBottom: "2px solid lightcoral"}} placeholder="repository link"/>
                    <ChooseSkills selected={selectedSkills} setSelected={setSelectedSkills}/>
                    <button onClick={submit}>{isNew ? "Create" : "Update"}</button>
                </form>
            </div>
        </>
    )
}

export default EditProject