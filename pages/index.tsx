import Head from 'next/head'
import dynamic from 'next/dynamic'
import App from '../components/mainWidget';
import Services from '../utils/services';
import React from 'react';
const Drawer = dynamic(() => import('../components/drawer'), {ssr: false}); // have to do this cause the stuff in the drawer comes from cookies -> context -> page. we dont want to ssr cause its not ready yet.
import UnsplashData from '../models/Unsplash';
import DashboardData from '../models/DashboardData';
import { ThemeSwitch } from '../components/themeSwitch';
import TodoProvider from '../context/appAdminContext';
import Cookies from 'cookies'

function Home({ stockData, imageData }) {
  const [reverse, setReverse] = React.useState(true);

  const handleChange = (e) => {
    setReverse((prev) => e);
  };

  return (
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
        color={reverse ? imageData.value.backgroundColor : checkColor(imageData.value.textColor)} />
      <footer>
      </footer>
    </div>
    </TodoProvider>
  )
}

Home.getInitialProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res)

  var adminCookie = cookies.get('adminData')
  var imageCookie = cookies.get('imageData')
  adminCookie = formatCookie(adminCookie)
  imageCookie = imageCookie ? JSON.parse(imageCookie) : imageCookie

  if(!adminCookie) {
    adminCookie = {
      stocks: ['CLOV', 'MSFT', 'AAPL'],
      image: {
        inspiration: 'beaches'
    },
    }
  }

  var stockData = await Services.getStonks(adminCookie.stocks);
  console.log(stockData)

  if(!imageCookie) {
    // Only have 50 requests/hour. https://unsplash.com/documentation#rate-limiting
    var imageUrl: UnsplashData = await Services.getImage(adminCookie.image.inspiration); 
    imageCookie = {
      imageUrl: imageUrl,
      inspiration: adminCookie.image.inspiration
    }

    var expireTime = new Date(); 
    expireTime.setMinutes(expireTime.getMinutes() + 30);

    cookies.set('imageData', JSON.stringify(imageCookie), { expires: expireTime})
  }

  var imageData: DashboardData = { value: imageCookie.imageUrl, loading: false };

  return { 
    stockData: stockData, 
    imageData: imageData,
  }
}

export default Home;

function checkColor(textColor: any): import("csstype").Property.Color {
  return textColor
}

function formatCookie(cookie: string) {
  if(!cookie)
    return
  
  let response = decodeURIComponent(cookie)
  response = JSON.parse(response)

  return response
}