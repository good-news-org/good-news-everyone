import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "../auth/authReducer";
import { groupsReducer } from "../groups/groupsReducer";
import { messagesReducer } from "../messages/messagesReducer";
import { usersReducer } from "../users/usersReducer";
import { routerReducer } from "../router/routerReducer";

export const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  groups: groupsReducer,
  messages: messagesReducer,
  users: usersReducer,
  router: routerReducer
});
