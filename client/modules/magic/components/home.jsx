import React from 'react';

import IconButton from '/client/modules/common/components/icon_button';
import SearchDividedList from '/client/modules/common/containers/search_divided_list';
import SearchSummaryListItem from '/client/modules/magic/components/search_summaries_list_item';
import {levels} from '/lib/configs/magic/search_levels.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      loaded: false
    };
    this.state = this.initialState;
  }

  render() {
    return (
      <div>
        <div className="ui four cards">
          <IconButton className="card" link="/MagIC/search" portal="MagIC">
            <i className="large icons">
              <i className="database icon"/>
              <i className="corner search icon"/>
            </i>
            <div className="title">Search</div>
            <div className="subtitle">Browse, combine, and save datasets.</div>
          </IconButton>
          <IconButton className="card" link="/MagIC/upgrade" portal="MagIC">
            <i className="large icons">
              <i className="file text outline icon"/>
              <i className="corner arrow up icon"/>
            </i>
            <div className="title">Upgrade</div>
            <div className="subtitle">Convert a dataset to the latest data model.</div>
          </IconButton>
          <IconButton className="card" link="/MagIC/upload" portal="MagIC">
            <i className="large icons">
              <i className="table icon"/>
              <i className="corner add icon"/>
            </i>
            <div className="title">Upload</div>
            <div className="subtitle">Import data into your private workspace.</div>
          </IconButton>
          <IconButton className="disabled card" link="/MagIC/validate" portal="MagIC" style={{display:'none'}}>
            <i className="large icons">
              <i className="file text outline icon"/>
              <i className="corner help icon"/>
            </i>
            <div className="title">Validate</div>
            <div className="subtitle">Confirm your dataset is ready.</div>
          </IconButton>
          <IconButton className="card" link="/MagIC/private" portal="MagIC">
            <i className="large icons">
              <i className="file text outline icon"/>
              <i className="corner checkmark icon"/>
            </i>
            <div className="title">Private Workspace</div>
            <div className="subtitle">Manage your contributions.</div>
          </IconButton>
        </div>
        <h2 className="ui horizontal divider header">
          MagIC Resources
        </h2>
        <div className="ui eight cards">
          <IconButton className="borderless card" link="/MagIC/data-models/3.0" portal="MagIC">
            <i className="small icons">
              <i className="sitemap icon"/>
              <i className="corner table icon"/>
            </i>
            <div className="small title">Data<br/>Model</div>
          </IconButton>
          <IconButton className="borderless card" link="/MagIC/method-codes" portal="MagIC">
            <i className="small icons">
              <i className="lab icon"/>
              <i className="corner write icon"/>
            </i>
            <div className="small title">Method<br/>Codes</div>
          </IconButton>
          <IconButton className="borderless card" link="/vocabularies" portal="MagIC">
            <i className="small icons">
              <i className="list icon"/>
              <i className="corner lock icon"/>
            </i>
            <div className="small title">Vocabulary<br/>Lists</div>
          </IconButton>
          <IconButton className="borderless card" href="https://earthref.org/PmagPy/cookbook/" portal="MagIC">
            <i className="small icons">
              <i className="bar chart icon"/>
              <i className="corner calculator icon"/>
            </i>
            <div className="small title">PmagPy<br/>Software</div>
          </IconButton>
          <IconButton className="borderless card" href="https://earthref.org/MagIC/dmp/" portal="MagIC">
            <i className="small icons">
              <i className="file text icon"/>
              <i className="corner write icon"/>
            </i>
            <div className="small title">Data Management<br/>Plan Tool</div>
          </IconButton>
          <IconButton className="borderless card" href="https://github.com/earthref/MagIC/issues" portal="MagIC">
            <i className="small icons">
              <i className="bug icon"/>
            </i>
            <div className="small title">Report a Problem<br/>on GitHub</div>
          </IconButton>
          <IconButton className="borderless card" href="/MagIC/jupyter-notebooks" portal="MagIC">
            <i className="small icons">
              <i className="code icon"/>
            </i>
            <div className="small title">Jupyter Notebooks</div>
          </IconButton>
          <IconButton className="borderless card" href="/MagIC/grand-challenges" portal="MagIC">
            <i className="small icons">
              <i className="unhide icon"/>
            </i>
            <div className="small title">Grand Challenges</div>
          </IconButton>
        </div>
        <h2 className="ui horizontal divider header">
          Recent Contributions
        </h2>
        <SearchDividedList
          es={_.extend({}, levels[0].views[0].es, { sort: [{'summary.contribution.timestamp': 'desc'}]})}
          pageSize={5}
          pageNumber={1}
        >
          <SearchSummaryListItem table="contribution"/>
        </SearchDividedList>
      </div>
    );
  }

  renderCommunity() {
    return (
      <div>
        <h2 className="ui horizontal divider header">
          MagIC Community
        </h2>
        <div className="ui hidden divider"></div>
        <div className="ui three stackable cards">
          <div className="card">
            <div className="content">
              <div className="header">Recent Contributions</div>
              <div className="ui divided relaxed items">
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description">
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <div className="header">MagIC News</div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <div className="header">Gpmag List</div>
              <div className="ui divided feed relaxed items">
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text">
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <h2 className="ui horizontal divider header">
            MagIC Links
          </h2>
          <div className="ui hidden divider"></div>
        </div>
      </div>
    );
  }

}

