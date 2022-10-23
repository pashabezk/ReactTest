const UPDATE_NEW_NEWS_POST_TEXT = 'UPDATE_NEW_NEWS_POST_TEXT';
const ADD_NEWS_POST = 'ADD_NEWS_POST';

let initialState = {
	newPostText: '',
	posts: [
		{id: 1, author: 'Eugeniy', text: 'Note1'},
		{id: 2, author: 'Alex', text: 'JKSDJAJ LJAKLSJDLKJDSLK AJDLKJLKjlkjljljl sd'},
		{id: 3, author: 'Saha', text: 'A long long time ago'},
		{id: 4, author: 'Anna', text: 'smth'},
		{id: 5, author: 'Maria', text: 'Я вредина! И я горжусь этим'},
		{id: 6, author: 'Daniil', text: 'Она точно вредина'},
	]
};

const newsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_NEWS_POST_TEXT:
			return {
				...state,
				newPostText: action.newPostText
			}
		case ADD_NEWS_POST:
			if (state.newPostText !== '') {
				return {
					...state,
					posts: [...state.posts, {id: 10, author: 'You', text: state.newPostText}],
					newPostText: ''
				}
			}
			return state;
		default:
			return state;
	}
}

export const addNewsPost = () => ({type: ADD_NEWS_POST});
export const updateNewNewsPostText = (text) => ({type: UPDATE_NEW_NEWS_POST_TEXT, newPostText: text});

export default newsReducer;