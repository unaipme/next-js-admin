const initialState = {
    fields: {
        "languages": ["id", "name", "last_update"],
        "films": ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
        "categories": ["name"]
    }
}

const reducer = (state = initialState, { type }) => {
    switch (type) {
        default:
            return state;
    }
}

export { reducer };