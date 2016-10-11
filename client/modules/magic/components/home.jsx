import React from 'react';
import IconButton from '../../common/components/icon_button.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
    };
    this.state = this.initialState;
  }

  render() {
    return (
      <div>
        <div className="ui small icon floating message">
          <i className="purple users icon"></i>
          <div className="content">
            <a className="ui purple header" href="https://earthref.org/events/MAGIC/2017/">
              MagIC 2017 Workshop: Earth's Magnetic Field from the Beginning
            </a>
            MagIC is hosting a workshop on January 24th-26th, 2017 at SIO in La Jolla, CA.
          </div>
          <a className="ui basic purple button" style={{margin:'0 1em'}}
             href="https://earthref.org/cgi-bin/erml-c0-introduction.cgi?event=MAGIC">
            Register
          </a>
          <div className="ui purple tiny statistic" style={{margin:'0 1em'}}>
            <div className="value">104</div>
            <div className="label">Days To Go!</div>
          </div>
        </div>
        <div className="ui header">
          <div className="ui one column padded centered grid">
            <div className="ui piled segment items">
              <a className="item" href="/MagIC/upgrade/">
                <div className="ui bordered images image" style={{marginBottom:'1em'}}>
                  <video className="image" autoPlay loop width="500" height="350">
                    <source src="/MagIC/upgrade.webm" type="video/webm"></source>
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="content" style={{textAlign:'left', margin:'auto'}}>
                  <div className="header">Upgrade</div>
                  <div className="extra">
                    Convert a<br/>
                    contribution<br/>
                    to the latest<br/>
                    data model.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui five cards">
          <IconButton className="disabled card" href="/MagIC/search" portal="MagIC">
            <i className="icons">
              <i className="database icon"/>
              <i className="corner search icon"/>
            </i>
            <div className="title">Search</div>
            <div className="subtitle">Browse, combine, and save contributions.</div>
          </IconButton>
          <IconButton className="card" href="/MagIC/upgrade" portal="MagIC">
            <i className="icons">
              <i className="file text outline icon"/>
              <i className="corner arrow up icon"/>
            </i>
            <div className="title">Upgrade</div>
            <div className="subtitle">Convert a contribution to the latest data model.</div>
          </IconButton>
          <IconButton className="card" href="/MagIC/upload" portal="MagIC">
            <i className="icons">
              <i className="table icon"/>
              <i className="corner add icon"/>
            </i>
            <div className="title">Upload</div>
            <div className="subtitle">Import data into a private workspace.</div>
          </IconButton>
          <IconButton className="disabled card" href="/MagIC/validate" portal="MagIC">
            <i className="icons">
              <i className="file text outline icon"/>
              <i className="corner help icon"/>
            </i>
            <div className="title">Validate</div>
            <div className="subtitle">Confirm your contribution is ready.</div>
          </IconButton>
          <IconButton className="disabled card" href="/MagIC/activate" portal="MagIC">
            <i className="icons">
              <i className="file text outline icon"/>
              <i className="corner checkmark icon"/>
            </i>
            <div className="title">Activate</div>
            <div className="subtitle">Make your contribution publicly visible.</div>
          </IconButton>
        </div>
        <h2 className="ui horizontal divider header">
          MagIC Resources
        </h2>
        <div className="ui three cards">
          <IconButton className="borderless card" href="/MagIC/data-model/3.0" portal="MagIC">
            <i className="large icons">
              <i className="sitemap icon"/>
              <i className="corner table icon"/>
            </i>
            <div className="title">Data Model</div>
          </IconButton>
          <IconButton className="borderless card" href="/MagIC/method-codes" portal="MagIC">
            <i className="large icons">
              <i className="lab icon"/>
              <i className="corner write icon"/>
            </i>
            <div className="title">Method Codes</div>
          </IconButton>
          <IconButton className="borderless card" href="/vocabularies" portal="MagIC">
            <i className="large icons">
              <i className="list icon"/>
              <i className="corner lock icon"/>
            </i>
            <div className="title">Vocabularies</div>
          </IconButton>
        </div>
        <h2 className="ui horizontal divider header">
          MagIC Statistics
        </h2>
        <div className="ui four cards">
          <IconButton className="borderless card" href="" portal="MagIC">
            <div className="ui purple statistic">
              <div className="value">
                7
              </div>
              <div className="label">
                New<br/>Contributors
              </div>
              <span>This Quarter</span>
            </div>
          </IconButton>
          <IconButton className="borderless card" href="" portal="MagIC">
            <div className="ui purple statistic">
              <div className="value">
                4.2K
              </div>
              <div className="label">
                Contribution<br/>Articles
              </div>
              <span>Publicly Visible</span>
            </div>
          </IconButton>
          <IconButton className="borderless card" href="" portal="MagIC">
            <div className="ui purple statistic">
              <div className="value">
                147.7K
              </div>
              <div className="label">
                Sites or<br/>Synthetics
              </div>
              <span>Publicly Visible</span>
            </div>
          </IconButton>
          <IconButton className="borderless card" href="" portal="MagIC">
            <div className="ui purple statistic">
              <div className="value">
                25
              </div>
              <div className="label">
                New or Updated<br/>Contributions
              </div>
              <span>This Month</span>
            </div>
          </IconButton>
        </div>
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

