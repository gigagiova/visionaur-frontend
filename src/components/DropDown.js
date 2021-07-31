import { useState } from "react"
import '../styles/popup.css'
import '../styles/dropdown.css'


const DropDown = ({title, options, onSelect, active}) => {

    const [show, setShow] = useState(false)

    return(
        <div style={{position:"relative"}}>
            <button className="popup-button" disabled={!active} onClick={() => setShow(s => !s)}>{title}</button>

            {show && (
                <div className="dropdown-content">
                    {Object.entries(options).map(([key, text]) => (
                        <p key={key} onClick={() => {onSelect(key); setShow(false);}}>{text}</p>
                    ))}
                </div>
            )}
        </div>
    )

}

export default DropDown