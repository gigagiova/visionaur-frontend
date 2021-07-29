import { createSlice, configureStore } from '@reduxjs/toolkit'


const popupSlice = createSlice({
    name: 'popup',
    initialState: { popupContent: null },
    reducers: {
        changePopup(state, action) {
            state.popupContent = action.payload
        }
    }
})

// FIX THIS
// retrive saved data from local storage
const access_token = localStorage.getItem('access_token')
const refresh_token = localStorage.getItem('refresh_token')

let initialUserState = null
// if we find them
if (access_token && refresh_token) {
    initialUserState = {
        access_token: access_token,
        refresh_token: refresh_token
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: {user: initialUserState},
    reducers: {
        login(state, action) {
            state.user = {
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                username: action.payload.username,
                email: action.payload.email,
                bio: action.payload.bio,
                profile_pic: action.payload.profile_pic
            }  

            if (action.payload.access) localStorage.setItem('access_token', action.payload.access)
            if (action.payload.refresh) localStorage.setItem('refresh_token', action.payload.refresh)
        },
        update(state, action) {
            state.user = {
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                username: action.payload.username,
                email: action.payload.email,
                bio: action.payload.bio,
                profile_pic: action.payload.profile_pic
            }  
        },
        logout(state) {
            state.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
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