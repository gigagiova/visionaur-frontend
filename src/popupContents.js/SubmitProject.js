import { useEffect, useState } from "react"
import { connect } from "react-redux"
import axiosInstance from "../API/axios"
import { popupActions, userActions } from "../store/redux"
import '../styles/popup.css'

const SubmitProject = props => {

    const [selected, setSelected] = useState(null) // the ID of the selected skill

    useEffect(() => {
    }, [])

    const submitProject = () => {
        axiosInstance.post('challenges/submit-project/', {project_slug: selected, challenge_slug: props.popup_data.challenge_slug})
        .then(res => props.close())
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2 className="popup-title">Submit Project</h2>
            <div className="popup-scroll">
                {props.user?.projects.map(s => {
                    if (s.role !== "M") {
                        const sel = s.project===selected
                        return (
                            <p key={s.project} 
                            className={"popup-scroll-element" + (sel ? " skill-selected"  : "")}
                            onClick={() => setSelected(sel ? null : s.project)}>{s.title}</p>
                        )
                    } else return null
                })}
            </div>
            <button className="popup-button" onClick={submitProject}>
                Submit {selected}
            </button>
        </div>
    )
}

const mapStateToProps = state => { return {user: state.user.user, popup_data: state.popup.data}}
const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(popupActions.changePopup({content: null}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProject)