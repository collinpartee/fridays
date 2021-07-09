import Head from 'next/head'
import App from '../components/mainWidget';
import Services from '../utils/services';
import React from 'react';
import Drawer from '../components/drawer';
import UnsplashData from '../models/Unsplash';
import DashboardData from '../models/DashboardData';
import { ThemeSwitch } from '../components/themeSwitch';
import TodoProvider from '../context/appAdminContext';




function Home({ stockData, imageData, appAdminData }) {

  const [reverse, setReverse] = React.useState(true);

  const handleChange = (e) => {
    setReverse((prev) => e);
  };
  return (
    <TodoProvider>
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
    </TodoProvider>
  )
}

Home.getInitialProps = async (ctx) => {

  var defaultStockList = process.env.NEXT_PUBLIC_TICKER_SYMBOLS.split(',');
  var stockData = await Services.getStonks(defaultStockList);

  var imageInspiration = process.env.NEXT_PUBLIC_IMAGE_SUBJECT.split(',');
  var imageUrl: UnsplashData = await Services.getImage(imageInspiration[0]);
  var imageData: DashboardData = { value: imageUrl, loading: false };

  return { 
    stockData: stockData, 
    imageData: imageData,
  }
}

export default Home;

function checkColor(textColor: any): import("csstype").Property.Color {
  return textColor
}
