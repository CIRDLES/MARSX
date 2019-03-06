import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import uploadReducer from './upload_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  upload: uploadReducer
});

export default rootReducer;
