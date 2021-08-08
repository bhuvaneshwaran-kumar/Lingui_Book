export const SET_USER = 'set_user';
export const UPDATE_HOMEPAGE_APPEND = 'update_hompage_append'
export const UPDATE_HOMEPAGE_PREPAND = 'update_hompage_prepand'
export const UPDATE_HOMEPAGE_SAVEDLIST = 'update_hompage_savedlist'
export const UPDATE_USER_TAG = 'UPDATE_USER_TAG'
// setUser action Creator.
export const setUser = (user) => {
    return {
        type: SET_USER,  //decides the operation type.
        payload: user
    }
}

export const updateUserTag = (data) => {
    return {
        type: UPDATE_USER_TAG,
        payload: data
    }
}

export const updateHomePageByAppend = (data) => {
    return {
        type: UPDATE_HOMEPAGE_APPEND,
        payload: data
    }
}

export const updateHomePageByPrepand = (data) => {
    return {
        type: UPDATE_HOMEPAGE_PREPAND,
        payload: data
    }
}

export const updateHomePageNote = (data) => {
    return {
        type: UPDATE_HOMEPAGE_SAVEDLIST,
        payload: data
    }
}