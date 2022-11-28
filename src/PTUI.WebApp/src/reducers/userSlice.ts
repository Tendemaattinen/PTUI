import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { UserInfo } from '../interfaces/UserInfo'
import { UserInterfaceHelpers } from '../helpers/UserInterfaceHelpers'
import {stat} from "fs";

const initialState = {
    loading: false,
    userInfo: null as (null | UserInfo),
    userToken: null as (null | string),
    error: null as (null | string),
    success: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
            
            // TODO: Async?
            UserInterfaceHelpers.restoreDefaultSettings();
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            let message = JSON.parse(action.payload as string);
            if (action.payload) {
                state.error = message.payload;
            }
            else {
                state.error = action.error.message as string;
            }
        })
        builder.addCase(userLogin.pending, (state, {payload}) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = false;
            if (payload.username != null) {
                state.userInfo = payload;
                //state.userInfo = payload;
                //state.userToken = payload.userToken;
            }
            // TODO: Api call to get settings
            //const settings: string = fakeApiCall();
            
            // TODO: Set settings to localstorage
            //setSettings(settings);
            
            // TODO: Do i need use redux store in navbar?
            
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            let message = JSON.parse(action.payload as string);
            if (action.payload) {
                state.error = message.payload;
            }
            else {
                state.error = action.error.message as string;
            }
        })
    }
})

interface Error {
    errorMessage: (null | string);
}

export const registerUser = createAsyncThunk<string, { firstName: string, lastName: string, email: string, username: string, password: string }, { rejectValue: string }>(
    'user/register',
    async ({ firstName, lastName, email, username, password }, thunkApi) => {
        try {
            const url: string = process.env.REACT_APP_API_BASE_URL + "register";
            const content: string = JSON.stringify({firstName: firstName, lastName: lastName,username: username, email: email, password: password })
            await axios.post(url, content, {
                headers: {
                    'Content-Type': 'application/json',
                }})
                .then(function (response) {
                    
                })
                .catch(function(error) {
                    throw thunkApi.rejectWithValue(error.response.data);
                })
        }
        catch (error: unknown) {
            throw thunkApi.rejectWithValue(JSON.stringify(error));
        }
        return "";
    }
)

export const userLogin = createAsyncThunk<UserInfo, {username: string, password: string}, { rejectValue: string} >(
    'user/login',
    async ({username, password}, thunkApi) => {
        let user = new UserInfo(null, null);
        try {
            const url: string = process.env.REACT_APP_API_BASE_URL + "token";
            const content: string = JSON.stringify({username: username, password: password})
            
            await axios.post(url, content, {
                headers: {
                    'Content-Type': 'application/json',
                }})
                .then(function (response) {
                    if (response.status != 200) {
                        throw thunkApi.rejectWithValue("Backend failure");
                    }
                    localStorage.setItem('user', response.data.userName);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    user = new UserInfo(response.data.userName, null);
                })
                .catch(function(error) {
                    throw thunkApi.rejectWithValue(error.response.data);
                })
        }
        catch (error: unknown) {
            throw thunkApi.rejectWithValue(JSON.stringify(error));
        }
        return user;
    }
)

export const { logout } = userSlice.actions
export default userSlice.reducer