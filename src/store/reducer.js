import * as actionTypes from './actions';

const initialState = {
    people: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PEOPLE:
            return {
                ...state,
                people: [...action.people]
            };
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                people: [...state.people, action.person]
            };
        case actionTypes.REMOVE_PERSON:
            const newPeople = [...state.people].filter(person => action.personId !== person.id);
            return {
                ...state,
                people: [...newPeople]
            }
        default:
            return state;
    }
}

export default reducer;