//TODO: put all types in here. can use them globally in the app w/o importing.
interface SubData {
    title: string;
    thumbnail: string;
    source: string;
    url: string;
    link: string;
    permalink: string;
    videoSrc: string;
    type: string;
}

type ContextType = {
    adminData: AppAdminData
    updateData: (data: AppAdminData) => void
    deleteData: (data: AppAdminData) => void
}

type AppAdminData = {
    subredditList: string[],
    countdownLabel: string[], // array of 1 item
    tickerList: string[],
    imageInspiration: string[], // array of 1 item
    countdownDate: string[], // array of 1 item
}