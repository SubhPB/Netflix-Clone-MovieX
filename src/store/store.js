/* -- Byimaan -- */ 

import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

export const store = configureStore({
    // state.home.url or state.home.genres
    reducer: {
        home: homeSlice,
    }
});