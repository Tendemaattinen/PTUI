import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import registerReducer from '../components/Register/registerSlice';
import userReducer from '../reducers/userSlice';
import preferenceReducer from "../reducers/preferenceSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    user: userReducer,
    preference: preferenceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
