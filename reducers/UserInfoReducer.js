const userInfoReducer = (state = {
    decks: [{
        id: 1,
        label: "First deck"
    },
    {
        id: 2,
        label: "Second deck"
    }
    ]
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userInfoReducer