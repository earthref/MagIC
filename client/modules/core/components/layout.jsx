import React from 'react';
import Navigation from './navigation.jsx';
import Home from './home.jsx';

export default class extends React.Component {

  componentDidMount() {
    $('.sidebar-menu').sidebar({context:$('.layout'), transition:'overlay'});
  }

  componentDidUpdate() {
    $('.sidebar-menu').sidebar('hide');
  }

  showSidebar() {
    $('.sidebar-menu').sidebar('show');
  }

  render() {
    const {portal} = this.props;
    return (
      <div className="layout">
        <div className="ui vertical inverted left sidebar menu sidebar-menu">
          <Navigation location="sidebar" portal={portal}/>
        </div>
        <div className="pusher">
          <div className="ui top fixed secondary pointing menu top-menu" style={{background: '#F8F8F8'}}>
            <div className="ui container">
              <a className="item sidebar-button"
                 onClick={this.showSidebar.bind(this)}
              >
                <i className="sidebar icon"/>
              </a>
              <div className="left menu horizontal-menu">
                <Navigation location="top" portal={portal}/>
              </div>
              <div className="right menu">
                <div className="ui search search-earthref">
                  <div className="ui transparent icon input item">
                    <input className="prompt" type="text" placeholder="Search EarthRef"/>
                    <i className="search icon"/>
                  </div>
                  <div className="results"></div>
                </div>
                <a className="ui dropdown item">
                  Login
                  <i className="dropdown icon"/>
                </a>
              </div>
            </div>
          </div>
          <div className="ui main container layout-content">
            <Home portal={portal}/>
          </div>
        </div>
      </div>
    );
  }

}
