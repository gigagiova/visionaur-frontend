import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import axiosInstance from '../API/axios'
import { popupActions } from '../store/redux'
import '../styles/popup.css'


const DeleteProject = () => {
    const data = useSelector(state => state.popup.data)
    const history = useHistory()
    const dispatch = useDispatch()

    if (!data) return (<div/>)

    const confirmDelete = () => {
        axiosInstance.delete(`/projects/${data.slug}/`)
        .then(res => history.push("/profile/"))
        .catch(err => console.log(err))
        dispatch(popupActions.changePopup({content: null}))
    }

    return(
        <div>
            <h2 className="popup-title">Delete project</h2>
            <p className="popup-text">Are you sure to delete {data.slug}? This action cannot be undone</p>
            <button className="popup-button" onClick={confirmDelete}>Delete</button>
        </div>
    )
}

export default DeleteProject