import * as React from "react";
import cookieCutter from 'cookie-cutter';
import { useCookies } from 'react-cookie';

export const AppAdminContext = React.createContext(null);

type CountProviderProps = { children: React.ReactNode };

export default function TodoProvider({ children }: CountProviderProps) {
    const [cookies, setCookie] = useCookies(['adminData']);
    var defaultState = cookies.name;
    // console.log('cookies before update', defaultState)
    
    
    const [adminData, setAdminData] = React.useState<AppAdminData>({
        subredditList: process.env.NEXT_PUBLIC_SUBREDDIT_NAMES.split(','),
        countdownDate: process.env.NEXT_PUBLIC_COUNTDOWN_DATE.split(','),
        tickerList: process.env.NEXT_PUBLIC_TICKER_SYMBOLS.split(','),
        imageInspiration: process.env.NEXT_PUBLIC_IMAGE_SUBJECT.split(','),
    });

    React.useEffect(() => {
        // Update the document title using the browser API
        Object.assign(adminData, cookies.name)
      });
    
    const updateData = (adminData: AppAdminData) => {
        setAdminData(adminData)
        setCookie('name', adminData, { path: '/' });
        // console.log('cookies after update', cookies.name)
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