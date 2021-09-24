import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import reactDom from "react-dom"
import { connect } from "react-redux"
import { mediaBaseURL } from "../API/utils"
import "../styles/bottombar.css"
import blank from '../assets/blank.png'


const BottomBar = (props) => {
    
    const [image, setImage] = useState(blank)

    useEffect(() => {
        if (props.user?.profile_pic) setImage(mediaBaseURL + props.user.profile_pic)
    }, [props.user])

    return reactDom.createPortal(
        <div className="bar-background">
            <NavLink activeClassName="active-bottom-icon" to="/home"><svg xmlns="http://www.w3.org/2000/svg"  className="bottom-icon" viewBox="0 0 24 24" fill="lightgray"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg></NavLink>
            <NavLink activeClassName="active-bottom-icon" to="/explore"><svg xmlns="http://www.w3.org/2000/svg" className="bottom-icon" viewBox="0 0 24 24" fill="lightgray"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg></NavLink>
            <NavLink activeClassName="active-bottom-icon" to="/messages"><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="bottom-icon" viewBox="0 0 24 24" fill="lightgray"><rect fill="none" fillRule="evenodd" height="24" width="24"/><g><path d="M12,4c4.97,0,8.9,4.56,7.82,9.72c-0.68,3.23-3.4,5.74-6.67,6.2c-1.59,0.22-3.14-0.01-4.58-0.7 c-0.27-0.13-0.56-0.19-0.86-0.19c-0.19,0-0.38,0.03-0.56,0.08l-2.31,0.68c-0.38,0.11-0.74-0.24-0.63-0.63l0.7-2.39 c0.13-0.45,0.07-0.92-0.14-1.35C4.26,14.34,4,13.18,4,12C4,7.59,7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,1.54,0.36,2.98,0.97,4.29 l-1.46,4.96C1.29,22,2,22.71,2.76,22.48l4.96-1.46c1.66,0.79,3.56,1.15,5.58,0.89c4.56-0.59,8.21-4.35,8.66-8.92 C22.53,7.03,17.85,2,12,2L12,2z"/></g></svg></NavLink>
            <NavLink activeClassName="active-bottom-icon" to="/notifications"><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="bottom-icon" viewBox="0 0 24 24" fill="lightgray"><g><rect fill="none" height="24" width="24"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,5v9h-3.56 c-0.36,0-0.68,0.19-0.86,0.5C14.06,15.4,13.11,16,12,16s-2.06-0.6-2.58-1.5C9.24,14.19,8.91,14,8.56,14H5V5H19z"/></g></svg></NavLink>
            <NavLink activeClassName="active-bottom-icon" to="/profile"><img src={image} className="bottom-icon pic"/></NavLink>
        </div>,
        document.getElementById('portal')
    )

}

const mapStateToProps = state => { return {user: state.user.user}}
export default connect (mapStateToProps)(BottomBar)