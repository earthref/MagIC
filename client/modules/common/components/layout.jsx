import {Meteor} from 'meteor/meteor';

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookies from 'js-cookie';

import {portals} from '/lib/configs/portals';

import Navigation from '/client/modules/common/components/navigation';
import { User } from './user';
import { LogIn } from './login';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deployedDate: undefined,
      tick: 0,
    };
  }

  componentDidMount() {
    Meteor.call('getDeploymentDateTimeUTC', (dtUTC) => {
      this.setState({deployedDate: moment(dtUTC).local().format('MMM D, Y')})
    });
    $(this.refs['sidebar menu']).sidebar({context:$(this.refs['layout']), transition:'overlay'});
  }

  componentDidUpdate() {
    $(this.refs['sidebar menu']).sidebar('hide');
  }

  showSidebar() {
    $(this.refs['sidebar menu']).sidebar('show');
  }

  render() {
    const {portal, fullWidth} = this.props;
    return (
      <div ref="layout" className="layout">
        <div ref="sidebar menu" className="ui vertical inverted left sidebar menu">
          <Navigation position="sidebar" portal={portal}/>
        </div>
        <div className="pusher">
          <div className={'ui main layout-content' + (fullWidth ? ' full-width' : ' container')}>
            <div ref="beta modal" className="ui modal">
              <h1 className="ui centered header">
                Beta Site
              </h1>
              <div className="content">
                <div className="description">
                  <div className="ui header">The EarthRef Beta Site is under active development.</div>
                  <p>Some features are disabled, some are incomplete, and some are mocked-up. Work is in progress.</p>
                  <p>For questions and comments, please contact Nick (<a href="mailto:njarboe@ucsd.edu">njarboe@ucsd.edu</a>) or Rupert (<a href="mailto:rminnett@earthref.org">rminnett@earthref.org</a>).</p>
                </div>
              </div>
              <div className="actions">
                <div className="ui purple right labeled icon approve button">
                  OK
                  <i className="checkmark icon"></i>
                </div>
              </div>
            </div>
            <div ref="safari modal" className="ui modal">
            <h1 className="ui centered header">
              Temporary Safari Warning
            </h1>
            <div className="content">
              <div className="description">
                <div className="ui header">The EarthRef MagIC Site is under active development.</div>
                <p>While we fix a few issues with features that are incompatible with Safari, please use Chrome or Firefox.</p>
                <p>For questions and comments, please contact Nick (<a href="mailto:njarboe@ucsd.edu">njarboe@ucsd.edu</a>) or Rupert (<a href="mailto:rminnett@earthref.org">rminnett@earthref.org</a>).</p>
              </div>
            </div>
            <div className="actions">
              <div className="ui purple right labeled icon approve button">
                OK
                <i className="checkmark icon"></i>
              </div>
            </div>
          </div>
            {this.props.children}
          </div>
        </div>
        <div className="ui top fixed secondary pointing menu top-menu">
          <a className="item sidebar-button" onClick={this.showSidebar.bind(this)} style={(fullWidth ? {} : {position: 'fixed'})}>
            <i className="sidebar icon"/>
          </a>
          <div className={'ui' + (fullWidth ? '' : ' container')}>
            <div className="left menu top-menu-navigation">
              <Navigation position="top" portal={portal}/>
            </div>
          </div>
        </div>
        <div className="ui top fixed secondary pointing menu right-menu">
          {(Cookies.get('mail_id') && Cookies.get('name')) && 
            <a className="ui button item" onClick={(e) => {
              Cookies.remove('mail_id');
              Cookies.remove('user_id');
              Cookies.remove('name');
              this.setState({ tick: this.state.tick+1 });
            }}>
              <i className="close icon"/>
              Log Out
            </a>
          }
          {Cookies.get('mail_id') && Cookies.get('name') ?
            <User className='item' portal={portal}/> :
            <LogIn className='item' portal={portal}/>
          }
        </div>
        <div className="ui bottom fixed small menu footer">
          <div className="ui container" style={{width:'calc(100% - 4em)'}}>
            <div className="left menu">
              <div className="ui vertical segment">
                <div>
                  Sponsored by <a href="https://www.nsf.gov" className={'ui header ' + portals[portal].color} style={{fontSize: '1rem'}}>NSF</a>.
                  {this.state.deployedDate ? ' Updated on ' + this.state.deployedDate + '.' : undefined}
                </div>
                <div>
                  Supported by <a href="https://scripps.ucsd.edu/" className={'ui header ' + portals[portal].color} style={{fontSize: '1rem'}}>UCSD-SIO</a>
                  &nbsp;and&nbsp;
                  <a href="http://ceoas.oregonstate.edu/" className={'ui header ' + portals[portal].color} style={{fontSize: '1rem'}}>OSU-CEOAS</a>.
                </div>
              </div>
            </div>
            <div className="menu">
              <a className={'ui button compact basic ' + portals[portal].color} style={{margin: '0.5em 0'}}
                 href={"mailto:webmaster@earthref.org?subject=[" + portal + " Help]%20I%27m%20having%20trouble%20with%20" + window.location.href}>
                <i className="mail icon"/>
                <b>Having trouble?</b> Email Us
              </a>
            </div>
            <div className="right menu">
              <div className="ui right aligned vertical segment">
                <div>
                  Unless otherwise noted, <a href="https://earthref.org/" className={'ui header ' + portals[portal].color} style={{fontSize: '1rem'}}>EarthRef.org</a>
                </div>
                <div>
                  content is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" className={'ui header ' + portals[portal].color} style={{fontSize: '1rem'}}>CC BY 4.0</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  portal:    PropTypes.oneOf(_.keys(portals)).isRequired,
  fullWidth: PropTypes.bool
};


export default Layout;
