import { createSlice, configureStore } from '@reduxjs/toolkit'


const defaultState = {
    popupContent: null
}

const popupSlice = createSlice({
    name: 'popup',
    initialState: defaultState,
    reducers: {
        changePopup(state, action) {
            state.popupContent = action.payload
        }
    }
})

const store = configureStore({
    reducer: {
        popup: popupSlice.reducer
    }
})

export const popupActions = popupSlice.actions
export default store