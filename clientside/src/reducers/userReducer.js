const initialState = {
    currentUser: JSON.parse(localStorage.getItem("token")) || null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Login":

            return { ...state, currentUser: action.payload }

        case "Logout":
            localStorage.removeItem("token")
            return { ...state, currentUser: null }

        case 'SET_BUDGET':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    budget: action.payload,
                },
            };

        case 'ADD_EXPENSE':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    expenses: [...state.currentUser.expenses, action.payload],
                    budget: state.currentUser.budget - action.payload.amount,
                },
            };

        default:
            return state;
    }
}

export default userReducer;