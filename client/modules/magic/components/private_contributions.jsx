import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';
import Cookies from 'js-cookie';
import {Tracker}  from 'meteor/tracker';
import {portals} from '../../common/configs/portals';
import {Collections} from '/lib/collections';
import Summary from './search_summaries_list_item';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loaded: false,
      updating: false
    };
    if (Cookies.get('user_id'))
      Tracker.autorun(() => {
        Meteor.subscribe('magic.private.contributions.summaries', '@' + Cookies.get('user_id'), () => {
          this.setState({loaded: true});
        });
      });
  }

  componentDidMount() {
    //$(this.refs['accordion']).accordion({exclusive: false});
    //setTimeout(() => { this.setState({loaded: true}); }, 1);
  }

  componentDidUpdate() {
    //this.search(this.refs['search'].value);
    $(this.refs['loading']).removeClass('active');
    this.setState({updating: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.updating ||
        nextState.search != this.state.search ||
        nextState.loaded != this.state.loaded) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({search: nextProps.search});
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  search(str) {
    const $tbls  = $(this.refs['accordion']).find('.data-model-table');
    const $grps  = $(this.refs['accordion']).find('.data-model-group');
    const $cols  = $(this.refs['accordion']).find('.data-model-column');

    // Enable columns that contain the string and disable others.
    if (str !== '') {
      $cols.addClass('no-match').filter(':icontains(' + str + ')').removeClass('no-match');
      $tbls.find('.data-model-table-count').each(function() {
        const $table = $(this).parents('.data-model-table');
        const n_match = $table.find('.data-model-column').not('.no-match').length;
        $(this).addClass(portals['MagIC'].color);
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
        if (n_match === 0)
          $table.addClass('no-match');
        else
          $table.removeClass('no-match');
      });
      $grps.find('.data-model-group-count').each(function() {
        const $group = $(this).parents('.data-model-group');
        const n_match = $group.find('.data-model-column').not('.no-match').length;
        $(this).addClass(portals['MagIC'].color);
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
        if (n_match === 0)
          $group.addClass('no-match');
        else
          $group.removeClass('no-match');
      });
      $(this.refs['count']).html($cols.not('.no-match').length + ' of ' + $cols.length);
      $(this.refs['count']).addClass(portals['MagIC'].color);
    }

    // Enable all columns since the search string is empty.
    else {
      $tbls.removeClass('no-match');
      $grps.removeClass('no-match');
      $cols.removeClass('no-match');
      const $counts = $tbls.find('.data-model-table-count, .data-model-group-count');
      $counts.removeClass(portals['MagIC'].color);
      $counts.children().remove();
      $(this.refs['count']).html($cols.length);
      $(this.refs['count']).removeClass(portals['MagIC'].color);
    }

    // If the search has up to 100 column matches or excludes an entire table,
    // expand all tables and groups.
    if ($cols.not('.no-match').length <= 100 || $tbls.filter('.no-match').length >= 1) {
      $tbls.not('.no-match').children().addClass('active');
      $grps.not('.no-match').children().addClass('active');

      if ($cols.not('.no-match').length <= 10)
        $cols.not('.no-match').children().children().addClass('active');
      else
        $cols.not('.no-match').children().children().removeClass('active');
    }

    // Otherwise, expand the first table and all of the groups.
    else {
      $tbls.not('.no-match').children().removeClass('active');
      $grps.not('.no-match').children().addClass('active');
      $cols.not('.no-match').children().children().removeClass('active');
      $tbls.not('.no-match').first().children().addClass('active');
    }

    // Show the error message if no column match.
    if (this.state.loaded && $tbls.not('.no-match').length === 0) {
      $(this.refs['segment']).hide();
      $(this.refs['no-match-message']).show();
    } else {
      $(this.refs['segment']).show();
      $(this.refs['no-match-message']).hide();
    }
  }

  render() {
    const privateContributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    console.log('privateContributions', privateContributions, Cookies.get('user_id'));
    return (
      <div style={{marginTop: '-3em'}}>
        <div className="ui top attached tabular menu">
          <div className="right menu">
            <div className="active item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search your contributions ..."
                    value={this.state.search}
                    style={{minWidth: '400px'}}
                    onChange={this.onSearchChange.bind(this)}
                  />
                  <i className={portals['MagIC'].color + ' search icon'}/>
                </div>
                <div className="results"></div>
              </div>
            </div>
          </div>
        </div>
        <div ref="segment" className="ui bottom attached segment" style={{minHeight: '8em'}}>
          <div ref="loading" className="ui inverted active dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <div className="ui divided list" style={{margin: '0'}}>
            {privateContributions.map((c,i) => {
              return (
                <div className="item" key={i}>
                  <div className="ui three column grid" style={{marginTop: '0', marginBottom: '0'}}>
                    <div className="column">
                      <div>
                        <div className={"ui labeled fluid input" + (c.contribution && c.contribution.doi && c.contribution.doi.length > 0 ? '' : ' error') + (this.state._id ? ' disabled' : '')}>
                          <div className={"ui label" + (c.contribution && c.contribution.doi && c.contribution.doi.length > 0 ? '' : ' red')}>
                            DOI
                          </div>
                          <input type="text" default="None" value={c.contribution && c.contribution.doi}
                                 onChange={(e) => {}}/>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className={portals['MagIC'].color + ' ui fluid basic disabled button'}>
                        <i className="add user icon"/>
                        Share
                      </div>
                    </div>
                    <div className="column">
                      <div className={portals['MagIC'].color + ' ui fluid basic disabled button'}>
                        <i className="checkmark icon"/>
                        Activate
                      </div>
                    </div>
                  </div>
                  {c._summary && c._summary.contribution ? <Summary doc={c._summary.contribution} key={i}/> : undefined}
                </div>
              );
            })}
          </div>
        </div>
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          None of your contributions match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

