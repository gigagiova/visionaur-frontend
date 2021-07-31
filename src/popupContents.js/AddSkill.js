import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import axiosInstance from "../API/axios"
import DropDown from "../components/DropDown"
import { levels } from "../components/Skill"
import { popupActions, userActions } from "../store/redux"
import '../styles/popup.css'

const AddSkill = props => {

    const [skills, setSkills] = useState([])
    const [level, setLevel] = useState(null)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(null) // the ID of the selected skill
    
    const popup = useSelector(state => state.popup)

    useEffect(() => {
        axiosInstance.get('/user/skills/')
        .then(res => setSkills(res.data))   
        .catch(err => console.log(err))
    }, [])



    return (
        <div>
            <h2 className="popup-title">Add new skill</h2>
            <input placeholder="search" value={query} onChange={e => setQuery(e.target.value)} style={{margin: "1em 5%"}}></input>
            <div className="scroll">
                {skills.map(s => {
                    // only show skills the users doesn't have yet, filtered by our search
                    if (!props.user.skills.find(us => us.skill.name===s.name) && s.name.toLowerCase().includes(query)) {
                        const sel = s.id===selected
                        return (
                            <p key={s.id} 
                            className={sel ? "scroll-element selected"  : "scroll-element" }
                            onClick={() => {if (selected) setLevel(null); setSelected(sel ? null : s.id)}}>{s.name}</p>
                        )
                    }
                })}
            </div>
            {level && selected ? 
                <button className="popup-button" onClick={() => props.addSkill(selected, skills.find(e => e.id===selected).name, level)}>
                    Add {skills.find(e => e.id===selected).name} {levels[level]}
                </button> :
                <DropDown title={"select level"} onSelect={setLevel} options={levels} active={selected}/>
            }
        </div>
    )
}

const mapStateToProps = state => { return {user: state.user.user}}
const mapDispatchToProps = dispatch => {
    return {
        addSkill: (id, name, level) => {
            dispatch(userActions.addSkill({skill: {id: id, name: name}, level: level}))
            dispatch(popupActions.changePopup({content: null}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSkill)