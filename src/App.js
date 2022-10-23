import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import NewsContainer from "./Components/News/NewsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Components/Common/Preloader/Preloader";

class App extends Component {

	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized)
			return <Preloader/>

		return (
			<div className='app-wrapper'>
				<HeaderContainer/>
				<Navbar/>
				<div className='app-wrapper-content'>
					<Routes>
						<Route path="/profile" element={<ProfileContainer/>}>
							<Route path=":userId" element={<ProfileContainer/>}></Route>
						</Route>
						<Route path="/dialogs/*" element={<DialogsContainer/>}/>
						<Route path="/news" element={<NewsContainer/>}/>
						<Route path="/users" element={<UsersContainer/>}/>
						<Route path="/login" element={<Login/>}/>
					</Routes>
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

export default compose(
	withRouter,
	connect(mapStateToProps, dispatchProps)
)(App);
