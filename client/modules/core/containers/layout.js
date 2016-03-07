import Home from '../components/home.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, portal}, onData) => {
  //const {LocalState} = context();
  //const portal = LocalState.get('PORTAL');
  onData(null, {portal})
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Home);

/*
const temp = ({content = () => null }) => (
  <div>
    <div className="ui vertical inverted sidebar menu left">
      <a className="active item">EarthRef.org</a>
      <a className="item">GERM</a>
      <a className="item">MagIC</a>
      <a className="item">SBN</a>
      <a className="item">ERESE</a>
    </div>
    <div className="ui top fixed secondary pointing menu" style={{background: '#F8F8F8'}}>
      <div className="ui container">
        <a className="item">
          <i className="sidebar icon" />
        </a>
        <a className="active green item">EarthRef.org</a>
        <a className="item">GERM</a>
        <a className="item">MagIC</a>
        <a className="item">SBN</a>
        <a className="item">ERESE</a>
        <div className="right menu">
          <div className="ui search">
            <div className="ui transparent icon input item">
              <input className="prompt" type="text" placeholder="Search EarthRef" style={{border: 'none', marginTop: '-1px', marginBottom: '-1px'}}/>
              <i className="search icon" />
            </div>
            <div className="results"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="ui main container main-layout-content" style={{paddingTop: '4em'}}>
      <Home />
    </div>
  </div>
);*/
