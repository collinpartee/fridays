import Head from 'next/head'
import App from '../components/mainWidget';
import Services from '../utils/services';
import React from 'react';
import Drawer from '../components/drawer';
import UnsplashData from '../models/Unsplash';
import DashboardData from '../models/DashboardData';
import { CountProvider, useCount } from '../contexts/color-context';
import { ThemeSwitch } from '../components/themeSwitch';




function Home({ stockData, imageData, appAdminData }) {

  const [reverse, setReverse] = React.useState(true);

  const handleChange = (e) => {
    setReverse((prev) => e);
    console.log('reversed theme', reverse);
  };
  console.log('index', appAdminData)
  return (
    <CountProvider>
      <ThemeSwitch onChange={handleChange} color={reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor)} />
    <div className="findme" style={{ height: '100vh', 
                                    backgroundColor: reverse ? checkColor(imageData.value.textColor) : imageData.value.backgroundColor, 
                                    color: reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor),
                                    transition: 'all .5s ease-out' }}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App stocks={stockData} image={imageData}/>
      </main>
      <Drawer 
        backgroundColor={reverse ? checkColor(imageData.value.textColor) : imageData.value.backgroundColor}
        color={reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor)}
        appAdminData={appAdminData} />
      <footer>
      </footer>
    </div>
    </CountProvider>
  )
}

Home.getInitialProps = async (ctx) => {

  var defaultStockList = ['CLOV', 'MSFT', 'AAPL', 'CCIV'];
  var stockData = await Services.getStonks(defaultStockList);
  var imageUrl: UnsplashData = await Services.getImage('beach');
  var imageData: DashboardData = { value: imageUrl, loading: false };
  var appAdminData: AppAdminData = {
    tickerList: process.env.NEXT_PUBLIC_TICKER_SYMBOLS,
    subredditList: process.env.NEXT_PUBLIC_SUBREDDIT_NAMES,
    countdownDate: process.env.NEXT_PUBLIC_COUNTDOWN_DATE,
    imageSubject: process.env.NEXT_PUBLIC_IMAGE_SUBJECT
  }
  return { 
    stockData: stockData, 
    imageData: imageData,
    appAdminData: appAdminData
  }
}

export type AppAdminData = {
  tickerList: string,
    subredditList: string,
    countdownDate: string,
    imageSubject: string,
}

export default Home;

function checkColor(textColor: any): import("csstype").Property.Color {
  console.log(textColor);
  return textColor
}
