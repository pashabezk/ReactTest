import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
		isAuth: state.auth.isAuth
	};
}

let mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (newMessageBody) => {
			dispatch(sendMessageActionCreator(newMessageBody));
		}
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);