import NavBar from "../components/NavBar"
import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axiosInstance from "../API/axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { popupActions } from "../store/redux"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../styles/page.css'
import '../styles/base.css'
import ChangePropic from "../inputs/ChangePropic"


const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

const EditChallenge = ({isNew}) => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [image, setImage] = useState(null)
    const [blob, setBlob] = useState(null)
    const [titleValid, setTitleValid] = useState(true)

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    // edit the toolbar to remove images in the rich text
    ClassicEditor.defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'undo',
                'redo',
            ]},
            language: 'en'
    }

    useEffect(() => {
        const today = new Date()
        setDeadline(months[(today.getMonth()+1)%12]+' '+today.getDate()+' '+today.getFullYear())
        if (!isNew) {
            axiosInstance.get(`/challenges/${params.slug}`)
            .then(res => {
                setTitle(res.data.title)
                setSlug(res.data.slug)
                setDescription(res.data.description)
                setDeadline(res.data.deadline)
                setImage(res.data.image)
            })
            .catch(err => console.log(err))
        }
    }, [])

    const onTitleChange = e => {
        const newTitle = e.target.value.replace(/^\s+|\s(?=\s)|[^a-zA-Z0-9\s]/, '')
        const newSlug = newTitle.replace(/\s/g, '-')
        setTitle(newTitle)
        setSlug(newSlug)
        axiosInstance.post('challenges/check-slug/', {slug: newSlug})
        .then(res => {
            if (res.data.available) setTitleValid(true)
            else setTitleValid(false)
        })
    }

    const submit = e => {
        e.preventDefault()

        let form = new FormData()
        form.append('title', title)
        form.append('description', description)
        form.append('slug', slug)
        form.append('deadline', deadline)
        if (blob) form.append('image', blob, `${slug}_image.png`)
        // not the best but works for now
        form.append('stringified_skills', JSON.stringify(user.tempSkills))

        if (isNew) {
            axiosInstance.post('/challenges/', form, {headers: {'Content-Type': 'multipart/form-data',}})
            .then(res => history.push("/challenge/" + res.data.slug))
            .catch(err => console.log(err))
        } else {
            axiosInstance.put(`/challenges/${params.slug}/`, form, {headers: {'Content-Type': 'multipart/form-data',}})
            .then(res => history.push("/challenge/" + res.data.slug))
            .catch(err => console.log(err))
        }
    }

    return(
        <>
            <NavBar title={isNew ? 'New Challenge' : params.slug} 
                leftButton={{text: "Cancel", onClick: () => history.push(`/challenge/${params.slug}/`)}} 
                rightButton={{text: "Delete", onClick: () => dispatch(popupActions.changePopup({content: 'DeleteProject', data: {slug: params.slug}}))}}
            />
            <div className="page">
                <form>
                    <ChangePropic setBlob={setBlob} default={image}/>
                    <input className="underline-input" onChange={onTitleChange} value={title} style={ titleValid ? {} : {borderBottom: "2px solid lightcoral"}} placeholder="Title"/>
                    <p style={{margin: "0", minHeight: "1em", textAlign: "center"}}>{slug}</p>

                    <div style={{width: "90%", margin:"2% auto"}}><CKEditor
                        editor={ ClassicEditor }
                        data={description}
                        onChange={ ( event, editor ) => setDescription(editor.getData()) }
                        config={{placeholder: "describe your challenge..."}}
                    /></div>
                    <div style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", gap: "2em"}}>
                        <p style={{margin: "0", padding: "1%"}}>deadline:</p>
                        <input className="underline-input" onChange={setDeadline} value={deadline} placeholder="deadline" style={{margin: "0"}}/>
                    </div>
                    <button onClick={submit}>{isNew ? "Create" : "Update"}</button>
                </form>
            </div>
        </>
    )
}

export default EditChallenge