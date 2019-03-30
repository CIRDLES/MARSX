//Npm Packages
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import requireAuth from './components/hoc/require_auth';
import noRequireAuth from './components/hoc/no_require_auth';
import SignIn from './components/SignIn';
import Mapping_Container from './components/Mapping_Container';
import HomePage from './components/HomePage';
import SignOut from './components/SignOut';
import Details from './components/Details'
import Header from './components/NavBar';

//CSS
//import 'bootstrap/dist/css/bootstrap.css';

//Actions and Reducers
import reducers from './reducers';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//Check cookies to see if user is already authenticated
//and login user is already authenticated

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});
/*console.log('Cookies usercode:', usercode)

if(usercode) {
  store.dispatch({ type: AUTHENTICATED });
}*/



ReactDOM.render(
  <Provider store={store}>
   <Router>
     <div>
       <Header/>
       <Route exact path="/" component={HomePage} />
       <Route path="/signin" component={noRequireAuth(SignIn)} />
       <Route path="/details" component={requireAuth(Details)} />
       <Route path="/signout" component={requireAuth(SignOut)} />
       <Route path="/mapping" component={requireAuth(Mapping_Container)} />
     </div>
   </Router>
 </Provider>,
  document.getElementById('root')
)
