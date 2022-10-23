import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebarPage: sidebarReducer,
	usersPage: usersReducer,
	newsPage: newsReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;