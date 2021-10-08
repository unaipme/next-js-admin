import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "./reducer";

const makeStore = () => {
    return configureStore({
        reducer: { main: reducer }
    });
};

const store = makeStore();

export { makeStore };

export default store;