import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from "./../Common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
	return (
		<form onSubmit={handleSubmit}>
			{/*{createField("Email", "email", [required], Input)}*/}
			<div><Field component={Input} name="email" validate={[required]} placeholder={"Email"}/></div>
			<div><Field component={Input} type="password" name="password" validate={[required]} placeholder={"Password"}/></div>
			<div><Field component={"input"} name="rememberMe" type="checkbox" id="rememberMe"/><label htmlFor="rememberMe">remember me</label></div>
			{
				error &&
				<div className={styles.formSummaryError}>
					{error}
				</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

const Login = (props) => {

	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe);
	}

	if (props.isAuth) {
		return <Navigate to={"/profile"}/>
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit}/>
		</div>
	);
};

const dispatchToProps = {
	login
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, dispatchToProps)(Login);