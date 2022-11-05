import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Message} from 'semantic-ui-react';

import IconButton from '/client/modules/common/components/icon_button';
import SearchDividedList from '/client/modules/common/containers/search_divided_list';
import SearchSummariesListItem from '/client/modules/magic/containers/search_summaries_list_item';
import News from '/client/modules/magic/components/home_news';
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
      <React.Fragment>
        <Grid divided><Grid.Row><Grid.Column width={12}>
          <div className="ui three cards">
            <IconButton className="card" link="/MagIC/search" portal="MagIC">
              <i className="large icons">
                <i className="database icon"/>
                <i className="corner search icon"/>
              </i>
              <div className="title">Search Interface</div>
              <div className="subtitle">Browse, combine, and save datasets.</div>
            </IconButton>
            <IconButton className="card" link="/MagIC/upload" portal="MagIC">
              <i className="large icons">
                <i className="table icon"/>
                <i className="corner add icon"/>
              </i>
              <div className="title">Upload Tool</div>
              <div className="subtitle">Import data into your private workspace.</div>
            </IconButton>
            <IconButton className="card" link="/MagIC/private" portal="MagIC">
              <i className="large icons">
                <i className="file text outline icon"/>
                <i className="corner checkmark icon"/>
              </i>
              <div className="title">Private Workspace</div>
              <div className="subtitle">Manage your contributions to MagIC.</div>
            </IconButton>
          </div>
          <h2 className="ui horizontal divider header" style={{marginBottom: 0}}>
            Search Interface Subdomain Views
          </h2>
          <div className="ui two cards">
            <IconButton className="borderless card" link="/MagIC/search/poles" portal="MagIC">
              <i className="icons">
                <i className="globe icon"/>
                <i className="corner search icon"/>
              </i>
              <div className="small title">Poles<br/>View</div>
            </IconButton>
            <IconButton className="borderless disabled card" portal="MagIC">
              <i className="icons">
                <i className="magnet icon"/>
                <i className="corner search icon"/>
              </i>
              <div className="small title">Rock-Mag<br/>View</div>
            </IconButton>
          </div>
          <h2 className="ui horizontal divider header" style={{marginBottom: 0}}>
            MagIC Resources
          </h2>
          <div className="ui nine cards" style={{marginTop: 0}}>
            <IconButton className="borderless card" link="/MagIC/data-models/3.0" portal="MagIC">
              <i className="icons">
                <i className="sitemap icon"/>
                <i className="corner table icon"/>
              </i>
              <div className="small title">Data<br/>Model</div>
            </IconButton>
            <IconButton className="borderless card" link="/MagIC/method-codes" portal="MagIC">
              <i className="icons">
                <i className="lab icon"/>
                <i className="corner write icon"/>
              </i>
              <div className="small title">Method<br/>Codes</div>
            </IconButton>
            <IconButton className="borderless card" link="/vocabularies" portal="MagIC">
              <i className="icons">
                <i className="list icon"/>
                <i className="corner info icon"/>
              </i>
              <div className="small title">Vocabulary<br/>Lists</div>
            </IconButton>          
            <IconButton className="borderless card" href="https://earthref.org/MagIC/dmp/" portal="MagIC">
              <i className="icons">
                <i className="file text icon"/>
                <i className="corner write icon"/>
              </i>
              <div className="small title">D.M.P.<br/>Tool</div>
            </IconButton>
            <IconButton className="borderless card" href="https://earthref.org/PmagPy/cookbook/" portal="MagIC">
              <i className="icons">
                <i className="bar chart icon"/>
                <i className="corner calculator icon"/>
              </i>
              <div className="small title">PmagPy<br/>Software</div>
            </IconButton>
            <IconButton className="borderless card" href="https://earthref.org/MagIC/books/Tauxe/Essentials/" portal="MagIC">
              <i className="icons">
                <i className="book icon"/>
                <i className="corner info icon"/>
              </i>
              <div className="small title">Paleomag <br/>Textbook</div>
            </IconButton>
            <IconButton className="borderless card" link="/MagIC/jupyter-notebooks" portal="MagIC">
              <i className="icons">
                <i className="file outline icon"/>
                <i className="corner code icon"/>
              </i>
              <div className="small title">Jupyter<br/>Notebooks</div>
            </IconButton>
            <IconButton className="borderless card" href="https://www.youtube.com/channel/UC-DbvhEu49a6dZXdvUWorhQ" portal="MagIC">
              <i className="icons">
                <i className="tv icon"/>
                <i className="corner headphones icon"/>
              </i>
              <div className="small title">YouTube<br/>Channel</div>
            </IconButton>
            <IconButton className="borderless card" link="/MagIC/help" portal="MagIC">
              <i className="icons">
                <i className="question icon"/>
              </i>
              <div className="small title">MagIC&nbsp;FAQ<br/>and Help</div>
            </IconButton>
          </div>
          <h2 className="ui horizontal divider header">
            Recent Contributions
          </h2>
          <SearchDividedList
            es={_.extend({}, levels[0].views[0].es, { sort: [{'summary.contribution.timestamp': 'desc'}]})}
            pageSize={7}
            pageNumber={1}
          >
            <SearchSummariesListItem table="contribution"/>
          </SearchDividedList>
          <IconButton className="small card" link="/MagIC/search" portal="MagIC" style={{margin:0}}>
            <div className="small title">View More Contributions in the MagIC Search Interface</div>
          </IconButton>
        </Grid.Column>
        <Grid.Column width={4}>
          <News/>
        </Grid.Column></Grid.Row></Grid>
      </React.Fragment>
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

