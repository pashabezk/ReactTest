import React from "react";
import styles from "./FormsControls.module.css"

export const FormControl = ({input, meta, children, ...props}) => {
	const hasError = meta.touched && meta.error;
	return (
		<div className={styles.formControl + " " + (hasError && styles.error)}>
			<div>
				{children}
			</div>
			{hasError && <span>{meta.error}</span>}
		</div>
	);
}

export const Textarea = (props) => {
	// const hasError = meta.touched && meta.error;
	// return (
	// 	<div className={styles.formControl + " " + (hasError && styles.error)}>
	// 		<div><textarea {...input} {...props}/></div>
	// 		{hasError && <span>{meta.error}</span>}
	// 	</div>
	// );

	const {input, meta, ...restProps} = props;
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps}/>
		</FormControl>
	);
}

export const Input = (props) => {
	const {input, meta, ...restProps} = props;
	return (
		<FormControl {...props}>
			<input {...input} {...restProps}/>
		</FormControl>
	);
}