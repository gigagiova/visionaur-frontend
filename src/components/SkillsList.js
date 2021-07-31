import { useDispatch } from "react-redux"
import { popupActions } from "../store/redux"
import Skill from "./Skill"

const SkillsList = props => {
    
    const dispatch = useDispatch()

    if (!props.list) return(<></>)

    return (
        <div>
            <ul className="skills-list">
                {props.list.map(s => (
                    <Skill data={s} edit={props.edit} key={s.skill.id}/>
                ))}
            </ul>
            {props.edit && <p className="link-text" onClick={() => dispatch(popupActions.changePopup({content: 'AddSkill'}))}>
                Add new skill
            </p>}
        </div>


    )
}

export default SkillsList