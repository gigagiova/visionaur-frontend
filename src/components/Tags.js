import "../styles/cards.css"

const Tags = ({list}) => {

    if (!list) return null

    return (
        <div>
            <h2>Tags</h2>
            {list.map(s => <p className="tag" key={s.id}>{s.name}</p>)}
        </div>
    )
}

export default Tags