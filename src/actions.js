let actions = {
    // Action Creator
    INCREMENT: function (number) {
        return { type: 'INCREMENT', payload: number }
    },

    DECREMENT: function (number) {
        return { type: 'DECREMENT', payload: number }
    }
}



export default actions;


