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
import BottomBar from './components/BottomBar'
import EditChallenge from './pages/EditChallenge'
import Challenge from './pages/Challenge'
import Explore from './pages/Explore'

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
        <Route path="/profile" exact><Profile/><BottomBar/></Route>
        <Route path="/explore" exact><Explore/><BottomBar/></Route>
        <Route path="/edit-profile"><ProfileSetup/></Route>
        <Route path="/force-logout"><ForceLogout/></Route>
        <Route path="/new-project"><EditProject isNew={true}/></Route>
        <Route path="/edit-project/:slug"><EditProject/></Route>
        <Route path="/user/:username"><User/><BottomBar/></Route>
        <Route path="/project/:slug"><Project/><BottomBar/></Route>
        <Route path="/new-challenge"><EditChallenge isNew={true}/></Route>
        <Route path="/edit-challenge/:slug"><EditChallenge/></Route>
        <Route path="/challenge/:slug"><Challenge/><BottomBar/></Route>
      </Switch>
      
      <Popup close={() => dispatch(popupActions.changePopup({content: null}))}/>
    </>
  );
}

export default App;
