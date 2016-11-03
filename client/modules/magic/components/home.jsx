import React from 'react';
import IconButton from '../../common/components/icon_button.jsx';
import SearchDividedList from '../../common/containers/search_divided_list';
import Summary from './search_summaries_list_item';

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
        <div>
          <div className="ui small icon floating message">
            <i className="purple users icon"/>
            <div className="content">
              <a className="ui purple header" href="https://earthref.org/events/MAGIC/2017/">MagIC 2017
                Workshop: Earth's Magnetic Field from the Beginning</a>
              MagIC hosted a workshop on
              January 24th-27th, 2017 at SIO in La Jolla, CA.
            </div>
          </div>
        </div>
        <div className="ui small icon floating warning message">
          <div className="content">
            <a className="ui purple header" href="https://earthref.org/events/MAGIC/2017/">
              MagIC 2017 Workshop: Earth's Magnetic Field from the Beginning
            </a>
            MagIC is hosting a workshop on January 24th-27th, 2017 at SIO in La Jolla, CA.
          </div>
        </div>
        <div className="ui header" style={{display:'none'}}>
          <div className="ui column padded grid">
            <div className="ten wide column">
              <div className="ui piled segment items">
                <a className="item" href="/MagIC/upgrade/">
                  <div className="ui bordered images image" style={{marginBottom:'1em'}}>
                    <video className="image" autoPlay loop width="500" height="350">
                      <source src="/MagIC/upgrade.webm" type="video/webm"/>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="content" style={{textAlign:'left', margin:'auto'}}>
                    <div className="header">Upgrade</div>
                    <div className="extra">
                      Convert a<br/>
                      dataset<br/>
                      to the latest<br/>
                      data model.
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="six wide column" style={{display:'none'}}>
              <div className="ui header">
                Recent Activity
              </div>
              <div className="ui divided relaxed feed items">
                <a className="item">
                  <div className="ui tiny image">
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
                  </div>
                  <div className="content">
                    <h5 className="ui header">Selkin, P.A., Gee, J.S. and Tauxe, L. (2007).</h5>
                    <div className="description" style={{fontWeight:'normal'}}>
                      Nonlinear thermoremanence acquisition and implications for paleointensity data. EPSL.
                    </div>
                  </div>
                </a>
                <a className="event item">
                  <div className="content">
                    <div className="summary">
                      Guillaume St-Onge, PhD
                      <div className="date">5 days ago</div>
                    </div>
                    <div className="extra text" style={{fontWeight:'normal'}}>
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
                    <div className="extra text" style={{fontWeight:'normal'}}>
                      Postdoctoral fellowship in paleomagnetism at the Institut des sciences de la mer de Rimouski (ISMER)
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui four cards">
          <IconButton className="disabled card" href="/MagIC/search" portal="MagIC">
            <i className="large icons">
              <i className="database icon"/>
              <i className="corner search icon"/>
            </i>
            <div className="title">Search</div>
            <div className="subtitle">Browse, combine, and save datasets.</div>
          </IconButton>
          <IconButton className="card" href="/MagIC/upgrade" portal="MagIC">
            <i className="large icons">
              <i className="file text outline icon"/>
              <i className="corner arrow up icon"/>
            </i>
            <div className="title">Upgrade</div>
            <div className="subtitle">Convert a dataset to the latest data model.</div>
          </IconButton>
          <IconButton className="disabled card" href="/MagIC/upload" portal="MagIC">
            <i className="large icons">
              <i className="table icon"/>
              <i className="corner add icon"/>
            </i>
            <div className="title">Upload</div>
            <div className="subtitle">Import data into your private workspace.</div>
          </IconButton>
          <IconButton className="disabled card" href="/MagIC/validate" portal="MagIC" style={{display:'none'}}>
            <i className="large icons">
              <i className="file text outline icon"/>
              <i className="corner help icon"/>
            </i>
            <div className="title">Validate</div>
            <div className="subtitle">Confirm your dataset is ready.</div>
          </IconButton>
          <IconButton className="disabled card" href="/MagIC/private" portal="MagIC">
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
        <div className="ui five cards">
          <IconButton className="borderless card" href="/MagIC/data-models/3.0" portal="MagIC">
            <i className="icons">
              <i className="sitemap icon"/>
              <i className="corner table icon"/>
            </i>
            <div className="title">Data<br/>Model</div>
          </IconButton>
          <IconButton className="borderless card" href="/MagIC/method-codes" portal="MagIC">
            <i className="icons">
              <i className="lab icon"/>
              <i className="corner write icon"/>
            </i>
            <div className="title">Method<br/>Codes</div>
          </IconButton>
          <IconButton className="borderless card" href="/vocabularies" portal="MagIC">
            <i className="icons">
              <i className="list icon"/>
              <i className="corner lock icon"/>
            </i>
            <div className="title">Vocabulary<br/>Lists</div>
          </IconButton>
          <IconButton className="borderless card" href="https://github.com/PmagPy/PmagPy" portal="MagIC">
            <i className="icons">
              <i className="bar chart icon"/>
              <i className="corner calculator icon"/>
            </i>
            <div className="title">PmagPy<br/>Software</div>
          </IconButton>
          <IconButton className="borderless card" href="https://earthref.org/MagIC/dmp/" portal="MagIC">
            <i className="icons">
              <i className="file text icon"/>
              <i className="corner write icon"/>
            </i>
            <div className="title">Data Management<br/>Plan Tool</div>
          </IconButton>
        </div>
      </div>
    );
  }

  renderRecentContributions() {
    return (
      <div>
        <h2 className="ui horizontal divider header">
          Recent Contributions
        </h2>
        <SearchDividedList
          subscriptionName="magic.pages.contributions.summaries"
          elasticsearchQuery={{}}
          elasticsearchFilters={{}}
          elasticsearchSort={[{'INSERTED': 'desc'}]}
          elasticsearchPageSize={5}
          minimongoSort={{'_inserted': -1}}
        >
          <Summary/>
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

