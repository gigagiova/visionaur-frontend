import Popup from './components/Popup'
import Landing from './pages/Landing'
import { popupActions, userActions } from './store/redux'
import './styles/base.css'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ProfileSetup from './pages/EditProfile'
import ForceLogout from './pages/ForceLogout'
import { useEffect } from 'react'
import axiosInstance from './API/axios'
import Profile from './pages/Profile'
import EditProject from './pages/EditProject'
import User from './pages/User'
import Project from './pages/Project'

const App = () => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    if (user) {
        axiosInstance.get('users/my-account/')
        .then(res => dispatch(userActions.login(res.data)))
    }
  }, [])

  return (
    <>
      <Switch>
        <Route path="/" exact><Landing/></Route>
        <Route path="/profile" exact><Profile/></Route>
        <Route path="/edit-profile"><ProfileSetup/></Route>
        <Route path="/force-logout"><ForceLogout/></Route>
        <Route path="/new-project"><EditProject/></Route>
        <Route path="/user/:username"><User/></Route>
        <Route path="/project/:slug"><Project/></Route>
      </Switch>
      
      <Popup close={() => dispatch(popupActions.changePopup({content: null}))}/>
    </>
  );
}

export default App;
