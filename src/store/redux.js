import { createSlice, configureStore } from '@reduxjs/toolkit'


const initialPopupState = {
    popupContent: null
}

const popupSlice = createSlice({
    name: 'popup',
    initialState: initialPopupState,
    reducers: {
        changePopup(state, action) {
            state.popupContent = action.payload
        }
    }
})


// FIX THIS
// retrive saved data from local storage
const first_name = localStorage.getItem('first_name')
const last_name = localStorage.getItem('last_name')

let initialUserState = null
// if we find them
if (first_name && last_name) {
    initialUserState = {
        first_name: first_name,
        last_name: last_name
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login(state, action) {
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
        },
        logout(state) {
            state = null
        }
    }
})

const store = configureStore({
    reducer: {
        popup: popupSlice.reducer,
        user: userSlice.reducer
    }
})

export const popupActions = popupSlice.actions
export const userActions = userSlice.actions
export default store