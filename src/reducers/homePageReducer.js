import { UPDATE_HOMEPAGE_APPEND, UPDATE_HOMEPAGE_PREPAND } from '../actions/index'

const defaultHomePageSate = []

const reducer = (state = defaultHomePageSate, action) => {
    switch (action.type) {
        case UPDATE_HOMEPAGE_APPEND:
            return [...state, ...action.payload]
        case UPDATE_HOMEPAGE_PREPAND:
            return [action.payload, ...state]
        default:
            return state
    }
}

export default reducer