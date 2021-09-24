import { useState } from "react"
import { useHistory } from "react-router"
import axiosInstance from "../API/axios"
import { mediaBaseURL } from "../API/utils"
import blank from '../assets/blank.png'
import Discussion from "./Discussion"


const Update = ({data}) => {

    const [discussion, setDiscussion] = useState(null)
    const history = useHistory()

    const toggleComments = () => {
        if (discussion) {
            setDiscussion(null)
        } else {
            axiosInstance.get(`social/get-update-comments/${data.id}`)
            .then(res => setDiscussion(res.data))
            .catch(err => console.log(err))
        }
    }

    return (
        <div style={{marginTop: "1em"}}>
            <p style={{marginBlockEnd: "0.5em"}}>{data.text}</p>
            <div className="comment-info">
                <img alt='profile' className="comment-image" src={data.by_user.profile_pic ? mediaBaseURL + data.by_user.profile_pic : blank}/>
                <p className="card-username" onClick={() => history.push("/user/" + data.by_user.username)}>@{data.by_user.username}</p><p>•</p>
                <p className="card-username" onClick={toggleComments}>{discussion ? "hide" : 'show'} comments</p>
            </div>
            { discussion && <div style={{marginLeft: "7%"}}><Discussion discussion={discussion} url='/social/post-update-comment/' parent={{id: data.id}}/></div>}
        </div>
    )
}

export default Update