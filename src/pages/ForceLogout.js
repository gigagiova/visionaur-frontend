import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { userActions } from "../store/redux"


const ForceLogout = () => {

    const dispatch = useDispatch()
    dispatch(userActions.logout())

    return (
        <Redirect to=""/>
    )
}

export default ForceLogout