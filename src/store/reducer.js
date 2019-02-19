import Action from '../action.js';

const Initial_state = {
    todo: [],
}

function MyReducer(state = Initial_state, action) {
    switch (action.type) {
        case Action.SIGN_UP_DATA:
            return action.payload

        case Action.SIGN_IN_DATA:
            return action.payload

        case Action.SIGN_OUT:
            return action.payload

        case Action.TODO:
            return Object.assign({}, state, { todo: action.payload });

        default:
            return state
    }
}

export default MyReducer;