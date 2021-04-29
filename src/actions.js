let actions = {
    // Action Creator
    INCREMENT: function (number) {
        return { type: 'INCREMENT', payload: number }
    },

    DECREMENT: function (number) {
        return { type: 'DECREMENT', payload: number }
    },

    SET_USER: function (user) {
        return { type: 'SET_USER', payload: user }
    },

    SET_JWT: function (jwt) {
        return { type: 'SET_JWT', payload: jwt }
    },

    PUSH_USER: function (user) {
        return { type: 'PUSH_USER', payload: user }
    },

    POPULATE_USERS: function (users) {
        return { type: 'POPULATE_USERS', payload: users }
    },

    CHANGE_USER: function (user) {
        return { type: 'CHANGE_USER', payload: user }
    },

    POPULATE_TOPICS: function (topics) {
        return { type: 'POPULATE_TOPICS', payload: topics }
    }
}



export default actions;


