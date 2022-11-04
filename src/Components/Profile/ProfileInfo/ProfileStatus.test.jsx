import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";
import React from "react";

describe("ProfileStatus component", ()=> {
	test("status from props should be in the state", ()=> {
		const component = create(<ProfileStatus status="newStatus"/>);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("newStatus");
	});

	test("after creation span should be displayed", async ()=> {
		const component = create(<ProfileStatus status="newStatus"/>);
		const root = component.root;
		let span = await root.findByType("span");
		expect(span).not.toBeNull();
	});

	test("after creation span should contains correct status", async ()=> {
		const component = create(<ProfileStatus status="newStatus"/>);
		const root = component.root;
		let span = await root.findByType("span");
		expect(span.children[0]).toBe("newStatus");
	});

	test("input should be displayed in edit mode instead of span", async ()=> {
		const component = create(<ProfileStatus status="newStatus"/>);
		const root = component.root;
		let span = await root.findByType("span");
		span.props.onDoubleClick();
		let input = await root.findByType("input");
		expect(input.props.value).toBe("newStatus");
	});

	test("callback should be called", async ()=> {
		const mockCallback = jest.fn();
		const component = create(<ProfileStatus status="newStatus" updateStatus={mockCallback}/>);
		const instance = component.getInstance();
		instance.deactivateEditMode();
		expect(mockCallback.mock.calls.length).toBe(1);
	});
});