import Popup from './components/Popup'
import Landing from './pages/Landing'
import { popupActions } from './store/redux'
import './styles/base.css'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Onboarding from './pages/Onboarding'

const App = () => {
  
  const dispatch = useDispatch()

  return (
    <>
      <Switch>
        <Route path="/" exact><Landing/></Route>
        <Route path="/onboarding"><Onboarding/></Route>
      </Switch>
      
      <Popup close={() => dispatch(popupActions.changePopup(null))}/>
    </>
  );
}

export default App;
