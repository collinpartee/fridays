import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Container, styled } from '@material-ui/core';
import { DashboardText } from './dashboardText';
import Services from '../utils/services';
import Clock from './clock';
import Stonk from '../models/Stonks';
import { Countdown } from './countdown';
import DashboardData from '../models/DashboardData';
import { AppAdminContext } from '../context/appAdminContext';

const Rail = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '3%',
  padding: '1% 0',
});
  const ImageCredit = styled('div')({
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',
    paddingLeft: '1%',
    fontSize: '0.8rem'
  });

interface MyProps {
  stocks: Stonk[];
  image: DashboardData;
};

interface MyState {
  randomFact: DashboardData;
};

function formatTickerString(tickerData: Stonk[]): string {
  var fString = '';
  tickerData.forEach((ticker, i) => fString += `${i == 0 ? '' : ' | '} ${ticker.ticker} ${ticker.price}`)
  return fString;
}

export default class App extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      randomFact: new DashboardData()
    };
  }

  async componentDidMount() {
    let { adminData } = this.context;
    await this.getRandomFact();
  }

  componentWillUnmount() { }

  async getRandomFact(): Promise<void> {
    var fact = await Services.getFact();
    var randomFact: DashboardData = { value: fact.text, loading: false };
    this.setState({ randomFact: randomFact });
  }

  render() {
    let { adminData } = this.context;
    return (
      <Container maxWidth="lg" style={{ padding: '4%' }}>
        <Rail alignItems='flex-end'>
          <DashboardText loading={this.state.randomFact.loading} text={this.state.randomFact.value} />
          <Countdown data={adminData.countdown} textColor={this.props.image.value.textColor} />
        </Rail>

        <div style={{display: 'flex'}}>
        {this.props.image.loading
          ? <Skeleton width={15} height={200} animation="wave" variant="rect" />
          : <ImageCredit> Photo by
              <a href={this.props.image.value.source}> {this.props.image.value.attribution},</a> found on
              <a href="http://unsplash.com"> Unsplash.com</a></ImageCredit>}
          <div style={{backgroundImage: `url(${this.props.image.value.uri})`, height: '60vh', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        </div>

        <Rail>
          <Box display='flex' alignItems='center'>
          <DashboardText loading={this.state.randomFact.loading} text={formatTickerString(this.props.stocks)} />
          </Box>
          <Clock enabled={true} />

          
        </Rail>
      </Container>
    );
  }
}

App.contextType = AppAdminContext;