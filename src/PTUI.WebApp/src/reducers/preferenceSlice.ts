import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../stores/store';
import UserInterfaceHelpers from "../helpers/UserInterfaceHelpers";

export interface PreferenceTypeState {
    preferenceType: number
}

const initialState: PreferenceTypeState = {
    preferenceType: 0
}

export const preferenceSlice = createSlice({
    name: 'preference',
    initialState,
    reducers: {
        changePreference: (state, action: PayloadAction<number>) => {
            state.preferenceType = action.payload;
            // TODO: Change UI
            // let data = UserInterfaceHelpers.getUserSettings(
            //     localStorage.getItem('userId') ?? "",
            //     state.preferenceType);
            // UserInterfaceHelpers.setUserStyle(data);
            
            // TODO: Change nav bar
            
            // TODO: Change page selector
        }
    }
})

export const {changePreference} = preferenceSlice.actions;
export const selectPreference = (state: RootState) => state.counter.value;
export default preferenceSlice.reducer;

