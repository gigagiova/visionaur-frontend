import Popup from './components/Popup'
import Landing from './pages/Landing'
import { popupActions } from './store/redux'
import './styles/base.css'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ProfileSetup from './pages/ProfileSetup'

const App = () => {
  
  const dispatch = useDispatch()

  return (
    <>
      <Switch>
        <Route path="/" exact><Landing/></Route>
        <Route path="/profile-setup"><ProfileSetup/></Route>
      </Switch>
      
      <Popup close={() => dispatch(popupActions.changePopup(null))}/>
    </>
  );
}

export default App;
