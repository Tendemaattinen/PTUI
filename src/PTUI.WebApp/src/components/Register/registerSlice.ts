import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../stores/store';

export interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    //status: 'idle' | 'loading' | 'failed';
}

const initialState: RegisterState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        
        
        
    }
});

export default registerSlice.reducer;