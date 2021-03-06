//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import requireAuth from './components/higherOrderComponents/require_auth';
import noRequireAuth from './components/higherOrderComponents/no_require_auth';
import SignIn from './components/SignIn/SignIn';
import Mapping_Container from './components/Mapping/Mapping_Container';
import Upload_Container from './components/Upload/Upload_Container';
import HomePage from './components/Homepage/HomePage';
import SignOut from './components/SignOut/SignOut';
import Details from './components/Details/Details'
import Header from './components/NavBar/NavBar';
import { loadState, saveState } from './localstorage';

//Reducer
import reducers from './reducers';

//create store
const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//Check persisted state for any authentication data
store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});

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
       <Route path="/upload" component={requireAuth(Upload_Container)}/>
     </div>
   </Router>
 </Provider>,
  document.getElementById('root')
)
