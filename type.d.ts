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
    subreddits: string[],
    countdown: Countdown,
    stocks: string[],
    mainImage: MainImage,
}

type MainImage = {
    inpsiration: string,
    url: string,
    source: string,
    credits: string,
    backgroundColor:string,
    textColor:string,
    altDescription:string,
    lastUpdated: string // TODO: might not need this..
}

type Countdown = {
    label: string,
    custom: boolean,
    date: string,
    daysTill: string
}