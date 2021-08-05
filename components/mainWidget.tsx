import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Container, styled } from '@material-ui/core';
import { DashboardText } from './dashboardText';
import Services from '../utils/services';
import Clock from './clock';
import { GetStaticProps } from 'next';
import Stonk from '../models/Stonks';
import { Countdown } from './countdown';
import DashboardData from '../models/DashboardData';
import SyncIcon from '@material-ui/icons/Sync';

const Rail = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '3%',
  padding: '1% 0',
});

interface MyProps {
  stocks: Stonk[];
  image: DashboardData;
};

interface MyState {
  countdownData: DashboardData;
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
      randomFact: new DashboardData(),
      countdownData: new DashboardData(),
    };
  }

  async componentDidMount() {
    await this.getRandomFact();
    await this.getCountdown('friday');
  }

  componentWillUnmount() { }

  async getRandomFact(): Promise<void> {
    var fact = await Services.getFact();
    var randomFact: DashboardData = { value: fact.text, loading: false };
    this.setState({ randomFact: randomFact });
  }

  async getCountdown(day: string): Promise<void> {
    var daysTill = await Services.getCountdown(day);
    var countdownData: DashboardData = { value: daysTill, loading: false }
    this.setState({ countdownData: countdownData });
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ padding: '4%' }}>
        <Rail alignItems='flex-end'>
          <DashboardText loading={this.state.randomFact.loading} text={this.state.randomFact.value} />
          <Countdown data={this.state.countdownData} textColor={this.props.image.value.textColor} />
        </Rail>

        <Box display="flex">
          <Clock enabled={true} />
          <div style={{backgroundImage: `url(${this.props.image.value.uri})`, height: '60vh', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        </Box>

        <Rail>
          <Box display='flex' alignItems='center'>
          <DashboardText loading={this.state.randomFact.loading} text={formatTickerString(this.props.stocks)} />
          {/* <SyncIcon style={{marginLeft: '16px', width: '11px'}} /> TODO: Make this work */}
          </Box>
          {this.props.image.loading
            ? <Skeleton width={150} animation="wave" variant="rect" />
            : <div> Photo by
                <a href={this.props.image.value.source}> {this.props.image.value.attribution},</a> found on
                <a href="http://unsplash.com"> Unsplash.com</a></div>}
        </Rail>
      </Container>
    );
  }
}
