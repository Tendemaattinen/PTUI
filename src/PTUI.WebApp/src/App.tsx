import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./components/AppRouter/AppRouter";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
import globalStyle from './assets/styles/globalStyle.module.scss';
import UserInterfaceHelpers from "./helpers/UserInterfaceHelpers";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {logAfterRefresh} from "./reducers/userSlice";

function App() {

    const { userName, userToken } = useAppSelector((state) => state.user)

    const { preferenceType } = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch();

    useEffect(() => {

        const setPreferencesUI = async (preferenceFit: number) => {
            await UserInterfaceHelpers.setUserPreferencesFromDatabase(
                localStorage.getItem('userId') ?? "",
                preferenceFit);

            // let set = localStorage.getItem(process.env.CSS_SETTINGS_LOCAL_VARIABLE_NAME?.toString() ?? "");
            // if (set) {
            //     let settings: object = JSON.parse(set);
            //     await UserInterfaceHelpers.setCssSettingsFromObject(settings);
            // }
        }
        
        const getPreferenceFit = async () => {
            return await UserInterfaceHelpers.getUserPreferenceFit(localStorage.getItem('userId') ?? "");
        }
        
        const changePreferenceUI = async () => {
            await setPreferencesUI(parseInt(await getPreferenceFit()));
        }
        
        if (!userToken && localStorage.getItem('token')) {
            dispatch(logAfterRefresh());
            changePreferenceUI();
        }
    }, [])
    
  return (
      <div className={`${"App"} ${globalStyle.appBody}`} style={globalStyle}>
        <nav className={globalStyle.navBody}>
            <NavigationBar/>
        </nav>
        <div className={globalStyle.mainBody}>
            <AppRouter/>
        </div>
        {/*<Footer/>*/}
    </div>
  );
}

export default App;
