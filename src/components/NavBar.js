import '../styles/navbar.css'
import React from 'react'
import { connect } from 'react-redux'
import { popupActions, userActions } from '../store/redux'

const NavBar = props => {

    return(
        <div className="navbar-background">
            <div className="box">
                { props.leftButton ? 
                    <button className="navbar-button" style={{marginRight: "auto"}} onClick={props.leftButton.onClick}>{props.leftButton.text}</button> :
                    <button className="navbar-button" style={{visibility: "hidden"}}>hidden</button>
                }
            </div>
            <div className="box"><span className="navbar-title">{props.title}</span></div>
            <div className="box">
                { props.user ? 
                    <button className="navbar-button" style={{marginLeft: "auto"}} onClick={props.logout}>Log out</button> :
                    <button className="navbar-button" style={{marginLeft: "auto"}} onClick={props.login}>Log in</button>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => { return {user: state.user.user}}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userActions.logout()),
        login: () => dispatch(popupActions.changePopup('Login'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
