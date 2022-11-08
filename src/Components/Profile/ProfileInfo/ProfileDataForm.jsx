import React from "react";
import {Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {required} from "../../../Utils/Validators/validators";
import {Field, reduxForm} from "redux-form";
import styles from "../../Common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, initialValues, error}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<button>save</button>
			</div>
			{
				error &&
				<div className={styles.formSummaryError}>{error}</div>
			}
			<div>
				<b>Fullname: </b>
				<Field component={Input} name="fullName" validate={[required]} placeholder={"Full Name"}/>
			</div>
			<div>
				<b>Looking for a job: </b>
				<Field component={Input} type="checkbox" name="looKingForAJob"/>
			</div>
			<div>
				<b>Job skills:</b>
				<Field component={Textarea} name="lookingForAJobDescription" placeholder={"My skills"}/>
			</div>
			<div>
				<b>About me:</b>
				<Field component={Textarea} name="aboutMe" placeholder={"About me"}/>
			</div>
			<div>
				<b>Contacts:</b> {Object.keys(initialValues.contacts).map(key => {
				return <Field key={key} component={Input} name={"contacts." + key} placeholder={key}/>
			})}
			</div>
		</form>
	);
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false})(ProfileDataForm)

export default ProfileDataFormReduxForm;
