import { UPDATE_HOMEPAGE_APPEND, UPDATE_HOMEPAGE_PREPAND, UPDATE_HOMEPAGE_SAVEDLIST } from '../actions/index'

const defaultHomePageSate = []

const reducer = (state = defaultHomePageSate, action) => {
    switch (action.type) {
        case UPDATE_HOMEPAGE_APPEND:
            return [...state, ...action.payload]

        case UPDATE_HOMEPAGE_PREPAND:
            return [action.payload, ...state]

        case UPDATE_HOMEPAGE_SAVEDLIST:
            return state.map(doc => {
                if (doc.id === action.payload.id) {
                    return action.payload
                } else {
                    return doc
                }
            })

        default:
            return state
    }
}

export default reducer