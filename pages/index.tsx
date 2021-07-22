import Head from 'next/head'
import App from '../components/mainWidget';
import Services from '../utils/services';
import React from 'react';
import Drawer from '../components/drawer';
import UnsplashData from '../models/Unsplash';
import DashboardData from '../models/DashboardData';
import { ThemeSwitch } from '../components/themeSwitch';
import TodoProvider from '../context/appAdminContext';
import { CookiesProvider, useCookies } from 'react-cookie';
import * as Cookie from 'cookie';
function Home({ stockData, imageData, appAdminData }) {

  const [reverse, setReverse] = React.useState(true);

  const handleChange = (e) => {
    setReverse((prev) => e);
  };
// console.log(imageData)
  return (
    <CookiesProvider>
    <TodoProvider>
      <ThemeSwitch onChange={handleChange} color={reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor)} secondColor={!reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor)} />
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
    </CookiesProvider>
  )
}

Home.getInitialProps = async (ctx) => {
  var adminData = Cookie.parse('name');

  console.log(adminData)

  var defaultStockList = process.env.NEXT_PUBLIC_TICKER_SYMBOLS.split(',');
  var stockData = await Services.getStonks(defaultStockList);

  var imageInspiration = process.env.NEXT_PUBLIC_IMAGE_SUBJECT.split(',');
  //TODO: store the result in a cookie for 30-45 mns if subject hasnt changed
  var imageUrl: UnsplashData = await Services.getImage(imageInspiration[0]); 
  // TODO: I have 50 requests/hour. if i exceed service returns 403 and i need to have default values
  // https://unsplash.com/documentation#rate-limiting
  var defaultPicture2: UnsplashData = {
    alt_description: "woman wearing white bikini set lying on white and brown unicorn inflatable float",
    attribution: "seefromthesky",
    backgroundColor: "#bf8ca6",
    source: "https://unsplash.com/photos/iWYrCr8eGwU",
    textColor: "#407359",
    uri: "https://images.unsplash.com/photo-1485248803654-ff245e4ec08c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNjE0NTkzMg&ixlib=rb-1.2.1&q=80&w=1080"
  }

  var defaultPicture: UnsplashData = {
    alt_description: "green palm tree on seashore during daytime",
    attribution: "raimondklavins",
    backgroundColor: "#3f2626",
    source: "https://unsplash.com/photos/TC4GFhpvqGc",
    textColor: "#c0d9d9",
    uri: "https://images.unsplash.com/photo-1613332954647-eb09cbc87afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNjA2NzU0MA&ixlib=rb-1.2.1&q=80&w=1080"
  }
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
