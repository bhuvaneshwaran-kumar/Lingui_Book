export const SET_USER = 'set_user';

// setUser action Creator.

export const setUser = (user) => {
    return {
        type: SET_USER,  //decides the operation type.
        payload: user
    }
}


