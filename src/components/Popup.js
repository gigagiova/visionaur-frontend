import '../styles/popup.css'
import { useEffect, useRef } from "react"
import reactDom from "react-dom"
import { useSelector } from 'react-redux'
import Register from '../forms/Register'
import Login from '../forms/Login'


// don't really like it, but for now is ok
const contents = {
  Login: <Login/>,
  Register: <Register/>,
  null: null
}


const Popup = props => {

    const panel = useRef();
    const content = useSelector(state => state.popup.popupContent)
    
    const handleClick = e => {
        if (panel.current && panel.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        props.close();
      };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    return reactDom.createPortal(
      <>
        {content && 
          <div className="overlay">
            <div className="popup-background" ref={panel}>
                {contents[content]}
            </div>
          </div>
        } 
      </>,
      document.getElementById('portal')
    )
}

export default Popup