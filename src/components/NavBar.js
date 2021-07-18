import '../styles/navbar.css'
import { popupActions } from '../store/redux'
import { useDispatch } from 'react-redux'

const NavBar = props => {

    const dispatch = useDispatch()
    
    return(
        <div className="navbar-background">
            <span className="navbar-title">VISIONAUR</span>
            <button className="navbar-button" onClick={() => dispatch(popupActions.changePopup('Login'))}>Log in</button>
        </div>
    )
}

export default NavBar