/* -- Byimaan -- */

import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
       url: {},
       genres: {},   
    },
    reducers: {
        /* -- actions -- */
        getApiConfig: (state,action) => {
            state.url = action.payload;
        },
        getGenres: (state,action) => {
            state.genres = action.payload;
        }
        /* -- actions end -- */
    },
});

// exporting each action...
export const {getApiConfig, getGenres} = homeSlice.actions;

// exporting whole reducer... 
export default homeSlice.reducer;