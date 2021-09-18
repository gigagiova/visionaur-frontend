import '../styles/popup.css'
import { useEffect, useRef } from "react"
import reactDom from "react-dom"
import { useSelector } from 'react-redux'
import Register from '../forms/Register'
import Login from '../forms/Login'
import AddSkill from '../popupContents.js/AddSkill'
import DeleteSkill from '../popupContents.js/DeleteSkill'
import DeleteProject from '../popupContents.js/DeleteProject'
import SubmitProject from '../popupContents.js/SubmitProject'


// don't really like it, but for now is ok
const contents = {
  Login: <Login/>,
  Register: <Register/>,
  AddSkill: <AddSkill/>,
  DeleteSkill: <DeleteSkill/>,
  DeleteProject: <DeleteProject/>,
  SubmitProject: <SubmitProject/>,
  null: null
}


const Popup = props => {

    const panel = useRef();
    const content = useSelector(state => state.popup)
    
    const handleClick = e => {
      //inside click
      if (panel.current && panel.current.contains(e.target)) return
      // outside click
      props.close()
    }

    useEffect(() => {
      // add when mounted
      document.addEventListener("mousedown", handleClick)
      // return function to be called when unmounted
      return () => document.removeEventListener("mousedown", handleClick)
    }, []);

    return reactDom.createPortal(
      <>
        {content.popupContent && 
          <div className="overlay">
            <div className="popup-background" ref={panel}>
                {contents[content.popupContent]}
            </div>
          </div>
        } 
      </>,
      document.getElementById('portal')
    )
}

export default Popup