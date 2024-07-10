import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    language: 'pl',
    language_list: ['pl', 'en'],
    query_param: null,
    // query_param: {
    //     transactionID: '3cbf11cd-d0b6-4e19-9599-bfa42d9e25a9',
    //     language: 'pl',
    // },
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
        setQueryParam: (state, actions) => {
            state.query_param = {...actions.payload}
        },
       
    }
})

export const { changeLanguage, setSerialOfMachine, setQueryParam } = actionsSlice.actions;
export default actionsSlice.reducer;