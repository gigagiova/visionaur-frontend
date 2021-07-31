import { useDispatch } from "react-redux"
import { popupActions } from "../store/redux"

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
            <p>{props.data.skill.name} - {levels[props.data.level]} 
                {props.edit && <span 
                    onClick={() => dispatch(popupActions.changePopup({content: 'DeleteSkill', data: props.data}))} 
                    style={{color: "orangered"}}>
                        {" "}delete
                </span>}
            </p>
        </div>
    )
}

export default Skill