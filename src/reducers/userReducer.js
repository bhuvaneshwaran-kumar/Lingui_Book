import { SET_USER, UPDATE_USER_TAG } from "../actions";

const initialState = null

const reducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case SET_USER:
            return action.payload
        case UPDATE_USER_TAG:
            return { ...state, tags: action.payload }
        default:
            return state
    }
}


export default reducer