import '../styles/landing.css'
import NavBar from '../components/NavBar'
import { popupActions } from '../store/redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Landing = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div>
            <NavBar title="VISIONAUR" rightButton={{text: "Profile", onClick: () => history.push("/profile")}}/>
            <div className="left-text">
                <h1 className="slogan">Dare, Connect, Innovate</h1>
                <h2 className="pitch">
                    Dare to be different and connect with likeminded innovators to bring your original ideas to life.
                </h2>
                <button className="CTA" onClick={() => dispatch(popupActions.changePopup({content: 'Register'}))}>
                    Get started
                </button>
            </div>
            <div className="header-image-container">
            </div>
        </div>
      );
}

export default Landing