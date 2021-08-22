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
            subreddits: ['memes'],
            countdown: {
                label: 'friday',
                custom: false,
                date: '5',
                daysTill: '1'
            },
            stocks: ['CLOV'],
            mainImage: {
                inpsiration: 'beaches',
                url: 'https://images.unsplash.com/photo-1485248803654-ff245e4ec08c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNjE0NTkzMg&ixlib=rb-1.2.1&q=80&w=1080',
                credits: 'seefromthesky',
                backgroundColor: "#bf8ca6",
                textColor: "#407359",
                lastUpdated: 'Sun, 22 Aug 2021 17:13:01 GMT', // TODO: might not need this..
                altDescription: "woman wearing white bikini set lying on white and brown unicorn inflatable float",
                source: "https://unsplash.com/photos/iWYrCr8eGwU"
            },
        }

        cookies.adminData = _adminData;
    }

    cookies.adminData.countdown.daysTill = Services.getCountdown(cookies.adminData.countdown.date)
    
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