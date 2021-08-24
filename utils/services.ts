import axios from 'redaxios';
import { unsplash } from '../config/unsplash';
import { toJson } from 'unsplash-js';
import Stonk from '../models/Stonks';
import Unsplash from '../models/Unsplash';
import { Subreddits } from '../models/SubData';

interface BlackHistoryFact {
  text: string
}


async function GetCryptos(cryptoSymbol: string): Promise<string> {
    //check if this can be an array of stuff
    var result = '';
    var crypto =  await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbol}&tsyms=USD`);
    return result
};

async function GetStonks(tickers: string[]): Promise<Stonk[]> {
  var result =[];

  for (let index = 0; index < tickers.length; index++) {
    const element = tickers[index];
    // var stockData = await axios.get(`https://www.styvio.com/api/${element}`);
    var stockData = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${element}&token=sandbox_c4i5vliad3ifj3t4ri70`)

    var stock = new Stonk({...stockData.data, ticker: element});
    result.push(stock);
    
  }

  return result;

};

async function GetRandomBlackHistoryFact(): Promise<BlackHistoryFact> {
    var uri = process.env.NEXT_PUBLIC_BLACK_HISTORY_URI.toString();
    var apiKey = process.env.NEXT_PUBLIC_BLACK_HISTORY_API_KEY.toString();
    let config = {
        headers: {
          "x-api-key": apiKey,
        }
      }
    var response = await axios.get(uri, config);
    var randomFact = response.data.Results[0];
    return randomFact;
};

async function GetImage(photoTopic: string): Promise<Unsplash> {
    try {
        var randomPic = await unsplash.photos.getRandomPhoto({query: photoTopic});
        var result = await toJson(randomPic)

        return new Unsplash(result);
    } catch (error) {
      console.log(error);
    }
};

async function GetRedditFeed(subredditName: string): Promise<Subreddits>{
  var data = await axios.get(`https://www.reddit.com/r/${subredditName}.json?`);
  return new Subreddits(data);
};

function GetCountdown(day: string): string {
  var daysTill = 0;
  console.log('countdown Day: ', day)
  const TODAY = new Date();

  const customDay = day.indexOf('-') > -1
  if(customDay) {
    var customDate = new Date(day);
// To calculate the time difference of two dates
var Difference_In_Time = customDate.getTime() - TODAY.getTime();
  
// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.ceil(Difference_In_Days).toString()
  }
  var dayOweek = TODAY.getDay();
  let dayNum = parseInt(day)

  daysTill =  dayNum < dayOweek ? 7 - dayOweek + dayNum : dayNum - dayOweek ;
  
  return daysTill.toString();
};

const services = {
    getCryptos: GetCryptos,
    getFact: GetRandomBlackHistoryFact,
    getImage: GetImage,
    getRedditFeed: GetRedditFeed,
    getCountdown: GetCountdown,
    getStonks: GetStonks
}

export default services;