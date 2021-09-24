import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axiosInstance from "../API/axios"
import { mediaBaseURL } from "../API/utils"
import blank from '../assets/blank.png'
import "../styles/comment.css"

const Discussion = ({discussion, indent=0, url, parent}) => {

    const [d, setDiscussion] = useState(discussion ? discussion : [])
    const [replies, setReplies] = useState({})
    const [text, setText] = useState('')
    const [bigComment, setComment] = useState('')
    const [openReply, setOpenReply] = useState(-1)
    const history = useHistory()

    useEffect(() => setDiscussion(discussion ? discussion : []), [discussion])

    const reply = id => {
        axiosInstance.post('/social/post-reply/', {comment_id: id, text: text})
        .then(res => { setText(''); setReplies(prev => ({...prev, [id]: res.data}))})
        .catch(err => console.log(err))

    }

    const comment = () => {
        if (indent !== 0) return
        
        axiosInstance.post(url, {...parent, text: bigComment})
        .then(res => { setComment(''); setDiscussion(prev => [...prev, res.data])})
        .catch(err => console.log(err))
    }

    const loadReplies = id => {
        if (id in replies) {
            // delete this comment replies from replies
            // not the most elegant syntax, but gets the work done
            setReplies(prev => { let copy = {...prev}; delete copy[id]; return copy })
        } else {
            axiosInstance.get(`/social/get-comments/${id}/`)
            .then(res => setReplies(prev => ({...prev, [id]: res.data})))
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            { indent === 0 &&                         
                <div>
                    <textarea value={bigComment} onChange={e => setComment(e.target.value)} style={{width: "-webkit-fill-available", height: "3em"}} placeholder="Write here"/>
                    <button onClick={comment} style={{display: "block", margin: "0 0 0 auto"}}>comment</button>
                </div>
            }
            {d.map(c => (
                <div key={c.id}>
                    <div style={{marginLeft: indent*7 + "%"}}>
                        <p style={{marginBlockEnd: "0.5em"}}>{c.text}</p>
                        <div className="comment-info">
                            <img alt='profile' className="comment-image" src={c.by_user.profile_pic ? mediaBaseURL + c.by_user.profile_pic : blank}/>
                            <p className="card-username" onClick={() => history.push("/user/" + c.by_user.username)}>@{c.by_user.username}</p><p>•</p>
                            { c.children_count > 0 && <><p className="card-username" onClick={() => loadReplies(c.id)}>{c.id in replies ? "hide" : `show ${c.children_count}`} replies</p> <p>•</p></>}
                            <p className="card-username" onClick={() => setOpenReply(prev => prev === c.id ? -1 : c.id )}>{openReply === c.id ? "close" : "reply"}</p>
                        </div>
                    </div>
                    {openReply === c.id && 
                        <div>
                            <textarea value={text} onChange={e => setText(e.target.value)} style={{marginLeft: 7*(indent+1)+"%", width: "-webkit-fill-available", marginBottom: "0", height: "4em"}}/>
                            <button onClick={() => reply(c.id)} style={{display: "block", margin: "0 0 0 auto"}}>reply</button>
                        </div>
                    }
                    {c.id in replies  && <Discussion discussion={replies[c.id]} indent={indent+1}/>}
                </div>
            ))}
        </div>
    )
}

export default Discussion