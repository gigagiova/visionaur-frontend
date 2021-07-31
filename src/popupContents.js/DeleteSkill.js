import { useDispatch, useSelector } from "react-redux"
import { levels } from "../components/Skill"
import { popupActions, userActions } from "../store/redux"
import '../styles/popup.css'


const DeleteSkill = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.popup.data)

    if (!data) return (<div/>)

    const confirmDelete = () => {
        dispatch(userActions.removeSkill({id: data.skill.id}))
        dispatch(popupActions.changePopup({content: null}))
    }

    console.log(data)

    return(
        <div>
            <h2 className="popup-title">Delete</h2>
            <p className="popup-text">Are you sure to delete {data.skill.name}, {levels[data.level]} level from the list of your skills?</p>
            <button className="popup-button" onClick={confirmDelete}>Delete</button>
        </div>
    )
}

export default DeleteSkill