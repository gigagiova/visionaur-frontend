import { useDispatch } from "react-redux"
import { popupActions } from "../store/redux"
import "../styles/cards.css"

export const levels = {
    B: 'Beginner',
    I: 'Intermediate',
    A: 'Advanced',
    E: 'Expert'
}


const Skill = props => {

    const dispatch = useDispatch()

    if (!props.data) return(<div/>)

    const onClick = () => {
        // if (props.edit) dispatch(popupActions.)
    }

    return (
        <div onClick={onClick}>
            <p className="tag">{props.data.skill.name}, {levels[props.data.level]} 
                {props.edit && <span 
                    onClick={() => dispatch(popupActions.changePopup({content: 'DeleteSkill', data: props.data}))} 
                    style={{color: "orangered"}}>
                        {"  "} Delete
                </span>}
            </p>
        </div>
    )
}

export default Skill