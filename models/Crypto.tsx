export default class Crypto {
  usdPrice: string;

  constructor(data: any) {
    this.usdPrice = data.USD;
  }
}