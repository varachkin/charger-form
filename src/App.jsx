import './assets/css/App.css'
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import AppRouter from './AppRouter';


function App(props) {
const store = setupStore(props)
  return (
    <Provider store={store}>
      <div className='app'>
        <AppRouter {...props}/>
      </div>
    </Provider>
  )
}

export default App
