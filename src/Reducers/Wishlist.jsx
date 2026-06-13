function wishlistReducer(state, action) {

    switch (action.type) {

        case "toggleWishlist":

            const exist = state.find(
                item => item.id === action.data.id
            );

            if (exist) {

                return state.filter(
                    item => item.id !== action.data.id
                );
            }

            return [
                ...state,
                action.data
            ];

        case "removeWishlist":

            return state.filter(
                item => item.id !== action.id
            );

        default:
            return state;
    }
}

export default wishlistReducer;