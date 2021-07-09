import React from 'react';
import { Box, darken, styled, lighten } from '@material-ui/core';
import posed from 'react-pose';
import Services from '../utils/services';
import { Subreddits } from '../models/SubData';
import DrawerContent from './drawerContent';
import { AppAdminContext } from '../context/appAdminContext';

const SlidingDrawer = posed.div({
  hidden: { 
    y: '0%',
    delayChildren: 500,
    staggerChildren: 50
  },
  visible: { 
    y: `85%`, 
    delayChildren: 500,
    staggerChildren: 50 
  },
  transition: { 
    type: 'spring' 
  },
});

const AniTab = posed.div({
  hidden: { x: '0%' },
  visible: { x: '-1000%' },
});

const DrawerContainer = styled('div')(props => ({
  position: 'absolute',
  width: '98%',
  zIndex: 5,
  left: 15,
  backgroundColor: 'inherit'
}));

const Close = styled('div')(props => ({
  flex: '1 0 30%',
  textAlign: 'right',
  textTransform: 'uppercase',
  paddingRight: '1%'
}));

const DrawerButton = styled('div')(props => ({
  marginRight: '16px',
  backgroundColor: 'lightgrey',
  padding: '10px 15px',
}));

const ButtonBar = styled(Box)(props => ({
  paddingLeft: '16px'
}));

interface MyProps { 
  backgroundColor: string;
  color: string;
  appAdminData: AppAdminData;
};

interface MyState {
  isVisible: boolean;
  topics: string[];
  selectedSub: string;
  subData: Subreddits,
  loading: boolean
};

export default class Drawer extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      topics: [],
      selectedSub: null,
      subData: null,
      loading: true
    };
  }

  componentDidMount() {
    var defaultValues = process.env.NEXT_PUBLIC_SUBREDDIT_NAMES.split(',');
    console.log('defaultValues', defaultValues)
    this.setState({topics: this.props.appAdminData && this.props.appAdminData.subredditList || defaultValues})
   }

  componentWillUnmount() { }

  toggleDrawer = (visible: boolean) => {
    if (visible)
      this.getSubData(null)
    this.setState({isVisible: visible, subData: null})
  }

  getSubData = async (subName: string) => {
    var data = null; 
    if (subName)
      data = await Services.getRedditFeed(subName);

    this.setState({selectedSub: subName, subData: data});
  }

  getBackgroundColor = (subName: string) => {
    return this.state.selectedSub == subName ? darken(this.props.backgroundColor, 0.4) : darken(this.props.backgroundColor, 0.2)
  }
  getTextColor = (subName: string) => {
    return this.state.selectedSub == subName ? lighten(this.props.backgroundColor, 0.8) : lighten(this.props.backgroundColor, 0.4)
  }

  render() {
    let { adminData } = this.context;
    console.log('context ', adminData)
    return (
      <DrawerContainer style={{bottom: !this.state.isVisible ? '4%' : '0'}}>
      <SlidingDrawer pose={!this.state.isVisible ? 'visible' : 'hidden'}>
          <ButtonBar display='flex' alignItems='center'>
              <DrawerButton onClick={() => this.toggleDrawer(true)} style={{backgroundColor: this.getBackgroundColor(null), color: this.getTextColor(null)}}>
                open me
              </DrawerButton>
            {
              adminData.subredditList && adminData.subredditList.map((subName, i) => {
                return ( <AniTab key={i}><DrawerButton onClick={() => this.getSubData(subName)} style={{backgroundColor:this.getBackgroundColor(subName), color: this.getTextColor(subName)}}>{subName}</DrawerButton> </AniTab>)})
            }
            { this.state.isVisible && <Close onClick={() => this.toggleDrawer(false)}>Close</Close> }
          </ButtonBar>
          
          <DrawerContent visible={!this.state.isVisible} data={this.state.subData} />
      </SlidingDrawer>
      </DrawerContainer>
    );
  }
}

Drawer.contextType = AppAdminContext;