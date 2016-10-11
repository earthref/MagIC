import $ from 'jquery';
import React from 'react';
import Navigation from './navigation.jsx';

export default class extends React.Component {

  componentDidMount() {
    $(this.refs['sidebar menu']).sidebar({context:$(this.refs['layout']), transition:'overlay'});
  }

  componentDidUpdate() {
    $(this.refs['sidebar menu']).sidebar('hide');
  }

  showSidebar() {
    $(this.refs['sidebar menu']).sidebar('show');
  }

  render() {
    const {portal} = this.props;
    return (
      <div ref="layout" className="layout">
        <div ref="sidebar menu" className="ui vertical inverted left sidebar menu">
          <Navigation location="sidebar" portal={portal}/>
        </div>
        <div className="pusher">
          <div className="ui main container layout-content">
            {this.props.children}
          </div>
        </div>
        <div className="ui top fixed secondary pointing menu top-menu">
          <a className="item sidebar-button" onClick={this.showSidebar.bind(this)}>
            <i className="sidebar icon"/>
          </a>
          <div className="ui container">
            <div className="left menu top-menu-navigation">
              <Navigation location="top" portal={portal}/>
            </div>
          </div>
        </div>
        <div className="ui bottom fixed small menu footer">
          <div className="ui container">
            <div className="left menu">
              <div className="ui vertical segment">
                <div>
                  Sponsored by <a href="https://www.nsf.gov">NSF</a>.
                </div>
                <div>
                  Supported by <a href="https://scripps.ucsd.edu/">UCSD-SIO</a>
                  &nbsp;and&nbsp;
                  <a href="http://ceoas.oregonstate.edu/">OSU-CEOAS</a>.
                </div>
              </div>
            </div>
            <div className="right menu">
              <div className="ui right aligned vertical segment">
                <div>
                  Unless otherwise noted, <a href="https://earthref.org/">EarthRef.org</a>
                </div>
                <div>
                  content is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLogin() {
   return (
     <div className="ui top fixed secondary pointing menu right-menu">
       <div className="ui search search-earthref">
         <div className="ui transparent icon input item">
           <input className="prompt" type="text" placeholder="Search EarthRef ..."/>
           <i className="search icon"/>
         </div>
         <div className="results"></div>
       </div>
       <a className="ui dropdown item">
         Login
         <i className="dropdown icon"/>
       </a>
     </div>
   );
  }
}
