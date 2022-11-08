import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {HashRouter, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import Login from "./Components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Components/Common/Preloader/Preloader";
import store from "./redux/redux-store";

import HeaderContainer from "./Components/Header/HeaderContainer";

const DialogsContainer = React.lazy(() => import ("./Components/Dialogs/DialogsContainer"));
const NewsContainer = React.lazy(() => import ("./Components/News/NewsContainer"));
const UsersContainer = React.lazy(() => import ("./Components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import ('./Components/Profile/ProfileContainer'));

class App extends Component {

	catchAllUnhandledErrors = (promiseRejectEvent) => {
		alert(promiseRejectEvent);
	}

	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
	}

	componentWillUnmount() {
		window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
	}

	render() {
		if (!this.props.initialized)
			return <Preloader/>

		return (
			<div className='app-wrapper'>
				<HeaderContainer/>
				<Navbar/>
				<div className='app-wrapper-content'>
					<React.Suspense fallback={<Preloader width={500}/>}>
						<Routes>
							<Route path="/profile" element={<ProfileContainer/>}>
								<Route path=":userId" element={<ProfileContainer/>}></Route>
							</Route>
							<Route path="/dialogs/*" element={<DialogsContainer/>}/>
							<Route path="/news" element={<NewsContainer/>}/>
							<Route path="/users" element={<UsersContainer/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/*" element={<div>404 not found</div>}/>
						</Routes>
					</React.Suspense>
				</div>
			</div>
		);
	}
}

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();

		return <Component {...props} router={{location, navigate, params}}/>;
	}

	return ComponentWithRouterProp;
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

const dispatchProps = {
	initializeApp
}

let AppContainer = compose(
	withRouter,
	connect(mapStateToProps, dispatchProps)
)(App);

let SamuraiJSApp = (props) => {
	return (
		<React.StrictMode>
			{/*<BrowserRouter/>*/}
			<HashRouter basename={process.env.PUBLIC}>
				<Provider store={store}>
					<AppContainer/>
				</Provider>
			</HashRouter>
		</React.StrictMode>
	);
}

export default SamuraiJSApp;