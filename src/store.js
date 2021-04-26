import { createStore } from 'redux';

// Reducer
function counter(state, action) {
    if (typeof state === 'undefined') {
        state = 0 // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'INCREMENT':
            return parseInt(state) + action.payload
        case 'DECREMENT':
            return state - action.payload
        default:
            return state
    }

}


const store = createStore(counter, [0] + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;