import _ from 'lodash';
import React from 'react';
import saveAs from 'save-as';
import IconButton from '../../common/components/icon_button.jsx';
import MagICContribution from './contribution.jsx';
import {portals} from '../../common/configs/portals';
import {default as cvs} from '../../../../lib/modules/er/controlled_vocabularies';
import {default as svs} from '../../../../lib/modules/er/suggested_vocabularies';
import {default as contributions} from '../../../../lib/modules/magic/contributions';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loaded: false,
      updating: false
    };
  }

  componentDidMount() {
    $(this.refs['results']).accordion({exclusive: false});
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();
    this.showSettings();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  componentDidUpdate() {
    this.onWindowResize();
  }

  componentWillReceiveProps(nextProps) {
  }

  onWindowResize() {
    const windowHeight = $(window).height() - (this.props.bottomOffset || 0) - 29;
    if (windowHeight !== this.windowHeight) {
      this.windowHeight = windowHeight;
      $(this.refs['settings']).height(windowHeight - $(this.refs['settings']).offset().top);
      $(this.refs['results' ]).height(windowHeight - $(this.refs['results' ]).offset().top);
    }
  }

  onSearchChange(e) {
  }

  showSettings() {
    $(this.refs['show settings']).hide()
    $(this.refs['hide settings']).show();
    $(this.refs['settings']).show();
    $(this.refs['results']).addClass('settings-visible');
  }

  hideSettings() {
    $(this.refs['show settings']).show()
    $(this.refs['hide settings']).hide();
    $(this.refs['settings']).hide();
    $(this.refs['results']).removeClass('settings-visible');
  }

  renderSortSettings() {
    return (
      <div className="ui link list">
        <div className="active item">
          <i className="ui sort numeric descending icon"/>
          <div className="active content header">Upload Date</div>
        </div>
        <a className="item">
          <i className="ui icon"/>
          <div className="content">Publication Year</div>
        </a>
        <a className="item">
          <i className="ui icon"/>
          <div className="content">First Author</div>
        </a>
        <a className="item">
          <i className="ui icon"/>
          <div className="content">Age</div>
        </a>
        <a className="item">
          <i className="ui plus icon"/>
          <div className="content">Custom Sort Column</div>
        </a>
      </div>
    );
  }

  renderFilterSettings() {
    return (
      <div className="ui accordion">
        <div className="title"><i className="ui caret right icon"/>Bounding Box</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Age Range</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Uploaded By</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Following</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Method Codes</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Publication Year</div>
        <div className="content"></div>
        <div className="active title"><i className="ui caret down icon"/>External DB</div>
        <div className="active content ui list">
          <div className="item"><i className="ui icon"/><div className="content">ARCHEO00</div></div>
          <div className="item"><i className="ui icon"/><div className="content">CALS7K.2</div></div>
          <div className="item"><i className="ui icon"/><div className="content">DRAGON</div></div>
          <div className="item"><i className="ui icon"/><div className="content">GEOMAGIA50</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PALEOMAGIA</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PINT</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PINT08</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PSVRL</div></div>
          <div className="item"><i className="ui icon"/><div className="content">TAFI</div></div>
          <div className="item"><i className="ui icon"/><div className="content">TRANS</div></div>
        </div>
        <div className="title"><i className="ui caret right icon"/>Includes Intensities</div>
        <div className="title"><i className="ui caret right icon"/>Has Measurements</div>
        <div className="title"><i className="ui small plus icon"/> Custom Column Filter</div>
      </div>
    );
  }

  renderTabMenu() {
    return (
      <div className="ui top attached tabular small menu search-tab-menu">
        <a ref="show settings" className="item search-show-settings" onClick={this.showSettings.bind(this)}>
          <i className="ui chevron circle right black icon"/>
          Settings
        </a>
        <div className="active item">
          Contributions
        </div>
        <a className="item">
          Images
        </a>
        <a className="item">
          Map
        </a>
        <div className="right menu">
          <div className="item">
            <i className="download icon"/>
            <a href="#">Download</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="magic-search">
        <div className="ui top attached tabular menu level-tabs">
          <div className={'active item'}>
            Contributions
          </div>
          <a className="item" href="#">
            Locations
          </a>
          <a className="item" href="#">
            Sites
          </a>
          <a className="item" href="#">
            Samples
          </a>
          <a className="item" href="#">
            Specimens
          </a>
          <a className="item" href="#">
            Experiments
          </a>
          <div className="right menu">
            <div className="item">
              <i className="plus icon"/>
              <a href="#">Create</a>
            </div>
            <div className="item">
              <i className="up arrow icon"/>
              <a href="#">Upload</a>
            </div>
          </div>
        </div>
        <div className="ui bottom attached secondary segment">
          <div className="ui labeled fluid input">
            <div className={portals['MagIC'].color + ' ui label'}>
              Search MagIC
            </div>
            <input
              ref="search"
              className="prompt"
              type="text"
              placeholder="e.g. igneous outcrop"
              value={this.state.search}
            />
          </div>
          <table><tbody><tr>
            <td>
              <a href="#" ref="hide settings" className="ui top attached tabular small menu hide-settings-tab-menu" onClick={this.hideSettings.bind(this)}>
                <div className="active item hide-settings">
                  Settings
                </div>
                <div className="right menu">
                  <div className="item hide-settings-button">
                    <i className="ui chevron circle left black icon"/>
                  </div>
                </div>
              </a>
            </td>
            <td>
              {this.renderTabMenu()}
            </td>
          </tr>
          <tr>
            <td>
              <div ref="settings" className="search-settings">
                {this.renderSortSettings()}
                <div className="ui divider"></div>
                <h5 className="ui header">
                  Filter Settings
                </h5>
                {this.renderFilterSettings()}
              </div>
            </td>
            <td>
              <div ref="results" className="ui styled fluid accordion settings-visible search-results">
                {contributions.contributions.slice(0, 10).map((c,i) =>
                  <MagICContribution contribution={c} key={i}></MagICContribution>
                )}
              </div>
            </td>
          </tr></tbody></table>
        </div>
      </div>
    );
  }

}

