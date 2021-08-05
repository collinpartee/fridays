import * as React from "react";
import cookieCutter from 'cookie-cutter';
import { useCookies } from 'react-cookie';

export const AppAdminContext = React.createContext(null);

type CountProviderProps = { children: React.ReactNode };

export default function TodoProvider({ children }: CountProviderProps) {
    const [cookies, setCookie] = useCookies(['adminData']);
    console.log(cookies.adminData)
    
    const [adminData, setAdminData] = React.useState<AppAdminData>({
        ...cookies.adminData
    });

    // React.useEffect(() => {
    //     Object.assign(adminData, cookies.name)
    //   });
    
    const updateData = (adminData: AppAdminData) => {
        setAdminData(adminData)
        setCookie('adminData', adminData, { path: '/' });
        console.log('cookies after update', cookies.name)
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