import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    language: 'pl',
    language_list: ['pl', 'en'],
}
export const actionsSlice = createSlice({
    name: 'actions',
    initialState: () => initialState,
    reducers: {
        changeLanguage: (state, actions) => {
            state.language = actions.payload
        },
        setSerialOfMachine: (state, actions) => {
            state.serial = actions.payload
        },
       
    }
})

export const { changeLanguage, setSerialOfMachine } = actionsSlice.actions;
export default actionsSlice.reducer;