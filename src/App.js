import Popup from './components/Popup'
import Landing from './views/Landing'
import NavBar from './components/NavBar'
import { popupActions } from './store/redux'
import './styles/base.css'
import { useDispatch } from 'react-redux'

const App = () => {
  
  const dispatch = useDispatch()

  return (
    <>
      <NavBar/>
      <Landing/>
      <Popup close={() => dispatch(popupActions.changePopup(null))}/>
    </>
  );
}

export default App;
