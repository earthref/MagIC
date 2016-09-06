import React from 'react';

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
        <div className="ui mini icon floating message">
          <i className="purple users icon"></i>
          <i className="close icon"></i>
          <div className="content">
            <div className="header">
              MagIC 2017 Workshop: Earth's Magnetic Field from the Beginning
            </div>
            MagIC is hosting a workshop on January 24th-26th, 2017 at SIO in La Jolla, CA.&nbsp;&nbsp;
            <a>Register here to attend.</a>
          </div>
          <div className="ui purple tiny statistic" style={{margin:'0 1em'}}>
            <div className="value">146</div>
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
        <div className="ui five column grid">
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'0px 0px 0px 1px #792f91 inset'}} href="/MagIC/search/">
              <i className="icons">
                <i className="database icon"></i>
                <i className="purple corner search icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Search</div>
                <div className="sub header">Browse, combine, and save contributions.</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'0px 0px 0px 1px #792f91 inset'}} href="/MagIC/upload/">
              <i className="icons">
                <i className="table icon"></i>
                <i className="purple corner add icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Upload</div>
                <div className="sub header">Import data into a private workspace.</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'0px 0px 0px 1px #792f91 inset'}} href="/MagIC/validate/">
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="purple corner help icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Validate</div>
                <div className="sub header">Confirm your contribution is ready.</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'0px 0px 0px 1px #792f91 inset'}} href="/MagIC/activate/">
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="purple corner checkmark icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Activate</div>
                <div className="sub header">Make your contribution publicly visible.</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'0px 0px 0px 1px #792f91 inset'}} href="/MagIC/upgrade/">
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="purple corner arrow up icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Upgrade</div>
                <div className="sub header">Convert a contribution to the latest data model.</div>
              </div>
            </a>
          </div>
        </div>
        <h2 className="ui horizontal divider header">
          MagIC Resources
        </h2>
        <div className="ui three column relaxed padded grid">
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'none'}} href="/MagIC/data-model/">
              <i className="icons">
                <i className="sitemap icon"></i>
                <i className="purple corner table icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Data Model</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'none'}} href="/MagIC/method-codes/">
              <i className="icons">
                <i className="lab icon"></i>
                <i className="purple corner write icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Method Codes</div>
              </div>
            </a>
          </div>
          <div className="center aligned column">
            <a className="ui basic icon header button" style={{marginBottom:'0', boxShadow:'none'}} href="/vocabularies/">
              <i className="icons">
                <i className="list icon"></i>
                <i className="purple corner lock icon" style={{fontSize:'1.5em'}}></i>
              </i>
              <div className="content">
                <div className="ui purple header">Vocabularies</div>
              </div>
            </a>
          </div>
        </div>
        <h2 className="ui horizontal divider header">
          MagIC Statistics
        </h2>
        <div className="ui hidden divider"></div>
        <div className="ui four column grid">
          <div className="center aligned column">
            <div className="ui purple statistic">
              <div className="value">
                7
              </div>
              <div className="label">
                New<br/>Contributors
              </div>
              <span>This Quarter</span>
            </div>
          </div>
          <div className="center aligned column">
            <div className="ui purple statistic">
              <div className="value">
                4.2K
              </div>
              <div className="label">
                Contribution<br/>Articles
              </div>
              <span>Publicly Visible</span>
            </div>
          </div>
          <div className="center aligned column">
            <div className="ui purple statistic">
              <div className="value">
                147.7K
              </div>
              <div className="label">
                Sites or<br/>Synthetics
              </div>
              <span>Publicly Visible</span>
            </div>
          </div>
          <div className="center aligned column">
            <div className="ui purple statistic">
              <div className="value">
                25
              </div>
              <div className="label">
                New or Updated<br/>Contributions
              </div>
              <span>This Month</span>
            </div>
          </div>
        </div>
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

