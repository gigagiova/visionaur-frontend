import '../styles/navbar.css'
import { popupActions } from '../store/redux'
import { useDispatch, useSelector } from 'react-redux'

const NavBar = props => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    return(
        <div className="navbar-background">
            <span className="navbar-title">{props.title}</span>
            { !user && <button className="navbar-button" onClick={() => dispatch(popupActions.changePopup('Login'))}>Log in</button>}
        </div>
    )
}

export default NavBar