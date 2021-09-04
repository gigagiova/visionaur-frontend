import { useEffect, useState } from "react"
import axiosInstance from "../API/axios"
import "../styles/inputs.css"


const ChooseSkills = props => {

    const [skills, setSkills] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        axiosInstance.get('/user/skills/')
        .then(res => setSkills(res.data))   
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <input placeholder="search" value={query} onChange={e => setQuery(e.target.value)} style={{margin: "1em 25%", width: "50%"}}></input>
            <div className="scroll">
                {skills.map(s => {
                    const sel = props.selected.includes(s.id)
                    if (s.name.toLowerCase().includes(query)) {
                        return (
                            <p key={s.id}
                            className={"scroll-element" + (sel ? " scroll-selected"  : "")}
                            onClick={() => sel ? props.setSelected(p => p.filter(id => id !== s.id)) : props.setSelected(p => [...p, s.id])}>{s.name}</p>
                        )
                    }

                })}
            </div>
        </div>
    )
}

export default ChooseSkills