const defaultTitleState = {
    title: 'AUTHORIZATION',
    isAuthorized: false
}

export const authReducer = (state  = defaultTitleState, action) => {
    switch (action.type) {
        case "auth":
            return {...state, 
                title: JSON.parse(window.localStorage.getItem('user')).email,
                isAuthorized: true
                }
        
        case "logOut":
            return {...state, 
                title: 'AUTHORIZATION',
                isAuthorized: false
                }

        default:
            return state
        }
}