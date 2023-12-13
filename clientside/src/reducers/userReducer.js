const initialState = {
    currentUser: JSON.parse(localStorage.getItem("token")) || null ,
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case "Login":
            
            return {...state, currentUser: action.payload}

            case "Logout":
            localStorage.removeItem("token")
            return {...state, currentUser: null}
    
        default:
            return state;
    }
}

export default userReducer;