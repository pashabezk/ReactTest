import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It\'s my first post', likesCount: 11},
		{id: 3, message: 'Blabla', likesCount: 11},
		{id: 4, message: 'Dada', likesCount: 11}
	]
};

test('length of posts should be incremented', () => {
	let action = addPostActionCreator("it-aka");
	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {
	let action = addPostActionCreator("it-aka");
	let newState = profileReducer(state, action);

	expect(newState.posts[4].message).toBe("it-aka");
});

test('after deleting length should not be decrement if id is incorrect', () => {
	let action = deletePost(1000);
	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(4);
});