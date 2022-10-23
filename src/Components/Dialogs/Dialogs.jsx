import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/validators";

const DialogItem = (props) => {
	return (
		<div>
			<NavLink to={"/dialogs/" + props.id} className={(navData) => navData.isActive ? s.active : ''}>
				{props.name}
			</NavLink>
		</div>
	);
};

const Message = (props) => {
	return (
		<div className={s.message}>
			{props.message}
		</div>
	);
};

const AddMessageForm = (props) => {
	const maxLength100 = maxLengthCreator(100);

	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea} name="newMessageBody" validate={[required, maxLength100]} placeholder='Enter your message'/>
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	);
};

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

const Dialogs = (props) => {

	let state = props.dialogsPage;

	let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
	let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

	let addNewMessage = (values) => {
		// console.log("submit: " + values.newMessageBody);
		props.sendMessage(values.newMessageBody);
		values.newMessageBody = "";
	}

	// if (!props.isAuth)
	// 	return <Navigate to={"/login"}/>

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>
			<div className={s.messages}>
				<div>{messagesElements}</div>
				<AddMessageFormRedux onSubmit={addNewMessage}/>
			</div>
		</div>
	)
}

export default Dialogs;