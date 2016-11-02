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
    const windowHeight = $(window).height() - (this.props.bottomOffset || 0) - 15;
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
    $(this.refs['settings']).show();
  }

  hideSettings() {
    $(this.refs['show settings']).show()
    $(this.refs['settings']).hide();
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
      <div className="ui secondary pointing menu search-tab-menu">
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
            <i className="plus icon"/>
            <a href="#">Create</a>
          </div>
          <div className="item">
            <i className="up arrow icon"/>
            <a href="#">Upload</a>
          </div>
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
      <div className="search">
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
            <div className="active item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <i className={portals['MagIC'].color + ' search icon'}/>
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search MagIC ..."
                    value={this.state.search}
                  />
                </div>
                <div className="results"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui bottom attached segment">
          <table><tbody><tr>
            <td rowSpan="2">
              <div ref="settings" className="search-settings">
                <a className="search-hide-settings" onClick={this.hideSettings.bind(this)}>
                  <i className="ui chevron circle left black icon"></i>
                </a>
                <h5 className="ui header" style={{marginTop:0}}>
                  Sort Settings
                </h5>
                {this.renderSortSettings()}
                <div className="ui divider"></div>
                <h5 className="ui header">
                  Filter Settings
                </h5>
                {this.renderFilterSettings()}
              </div>
            </td>
            <td>
              {this.renderTabMenu()}
            </td>
          </tr>
          <tr>
            <td>
              <div ref="results" className="ui styled fluid accordion search-results">
                {contributions.contributions.map((c,i) =>
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

