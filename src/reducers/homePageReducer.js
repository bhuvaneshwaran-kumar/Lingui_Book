import { UPDATE_HOMEPAGE_APPEND } from '../actions/index'

const defaultHomePageSate = []

const reducer = (state = defaultHomePageSate, action) => {
    switch (action.type) {
        case UPDATE_HOMEPAGE_APPEND:
            return [...state, ...action.payload]
        default:
            return state
    }
}

export default reducer