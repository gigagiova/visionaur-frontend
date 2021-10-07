import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "../API/axios"
import { mediaBaseURL } from "../API/utils"
import NavBar from "../components/NavBar"
import blank from '../assets/blank.png'
import { useHistory } from "react-router"


const getNotificationString = notification => {
    if(notification.verb === "IP") 
        return `@${notification.actor_username} inveted you to join project ${notification.object_slug}`
}

const getNotificationLink = notification => {
    if(notification.verb === "IP") 
        return `/project/${notification.object_slug}`
}

const Notifications = () => {

    const [notifications, setNotifications] = useState([])
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get("/users/get-notifications/")
        .then(res => setNotifications(res.data))
        .catch(err => console.log(err))
    }, [])

    const getNotificationButton = notification => {
        if(notification.verb === "IP") 
            return (<button 
                onClick={() => 
                    axiosInstance.put('/social/execute-notification/', {id: notification.id})
                    .then(res => {
                        setNotifications(prev => prev.map(n => (n.id===notification.id ? {...n, completed: true} : n)))
                        history.push(`/project/${notification.object_slug}`)
                    })
                }>Join</button>)
    }

    return(
        <>
            <NavBar title="Notifications"/>
            <div className="center-column">
                {notifications.map(n => 
                    <div key={n.created} className="notification-card">
                        <img alt='profile' className="card-profile-pic" style={{width: "15%"}} src={n.image ? mediaBaseURL + n.image : blank}/>
                        <div className="notification-card-text" onClick={() => history.push(getNotificationLink(n))}>
                            {getNotificationString(n)}
                        </div>
                        {!n.completed && getNotificationButton(n)}
                    </div>
                )}
            </div>
        </>
    )

}

export default Notifications