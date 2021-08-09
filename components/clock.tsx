import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';

const ClockContainer = styled('div')({
});

interface MyProps {
  enabled: boolean
};
interface MyState {
  time: string;
};

export default class Clock extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    };
  }

  async componentDidMount() {
    await this.getTime();
    // this.timer = setInterval(() => this.fetchUsers(), 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
    // this.timer = null;
  }

  async getTime() {
    setInterval(() => this.setState({ time: moment().format('MMMM Do YYYY, h:mm:ss a') }), 1000);
  }

  render() {
    return (
      <ClockContainer>
        {this.state.time == '' || !this.props.enabled ? <Skeleton width={150} animation="wave" variant="rect" /> : this.state.time}
      </ClockContainer>
    );
  }
}