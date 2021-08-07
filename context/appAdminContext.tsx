import * as React from "react";
import Services from '../utils/services';
import { useCookies } from 'react-cookie';

export const AppAdminContext = React.createContext(null);

type CountProviderProps = { children: React.ReactNode };

export default function TodoProvider({ children }: CountProviderProps) {
    const [cookies, setCookie] = useCookies(['adminData']);
    // console.log(cookies.adminData)

    if(!cookies.adminData) {
        var _adminData: AppAdminData = {
            subredditList: ['memes'],
            countdownLabel: ['friday'],
            tickerList: ['CLOV'],
            imageInspiration: ['dogs'], 
            countdownDate: ['5'], 
        }

        cookies.adminData = _adminData;
    }
    
    const [adminData, setAdminData] = React.useState<AppAdminData>({
        ...cookies.adminData
    });
    const updateData = (adminData: AppAdminData) => {
        setAdminData(adminData)
        setCookie('adminData', adminData, { path: '/' });
        // console.log('cookies after update', adminData)
    }

    const deleteData = (key: string, value: string) => {
        const position = adminData[key].indexOf(value);
        const newValue = adminData[key].splice(position, 1);
        const newAdminData: AppAdminData = {
            ...adminData,
            [key]: newValue
        }
    }

    return (
        <AppAdminContext.Provider value={{ adminData, updateData, deleteData }}>
            {children}
        </AppAdminContext.Provider>
    );
};