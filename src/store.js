import { createStore, combineReducers } from 'redux';

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

function currentUser(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'SET_USER':
            return action.payload;

        default:
            return state
    }

}

function jwt(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'SET_JWT':
            return action.payload;

        default:
            return state
    }

}

function users(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'PUSH_USER':
            let newUsers = [...state];
            newUsers.push(action.payload);
            return newUsers;

        case 'POPULATE_USERS':
            return action.payload

        default:
            return state
    }

}

function selectedUser(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'CHANGE_USER':
            return action.payload;

        default:
            return state
    }
}

function topics(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'POPULATE_TOPICS':
            return action.payload;

        default:
            return state
    }
}

function rooms(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'POPULATE_ROOMS':
            return action.payload;

        default:
            return state
    }
}

function navBeVisible(state, action) {
    if (typeof state === 'undefined') {
        state = "" // If state is undefined, initialize it with a default value
    }

    switch (action.type) {
        case 'SET_NAV_VIS':
            return action.payload;

        default:
            return state
    }
}




const combinedReducers = combineReducers({
    counter,
    currentUser,
    jwt,
    users,
    selectedUser,
    topics,
    rooms,
    navBeVisible
})

const store = createStore(combinedReducers);
export default store;