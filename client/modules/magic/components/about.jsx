import React from 'react';
import {Link} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import IconButton from '/client/modules/common/components/icon_button';

export default class extends React.Component {

  render() {
    return (
        <div>
          <p>
            The Magnetics Information Consortium (MagIC) improves research capacity in the Earth and Ocean sciences by maintaining an open community digital data archive for rock and paleomagnetic data with portals that allow users access to archive, search, visualize, and download these data. 
MagIC supports the international rock and paleomagnetic communities and endeavors to bring data out of private archives, making them accessible to all and (re-)useable for new, creative, collaborative scientific and educational activities. 
It is inherently domain-specific and directed by PIs who are both producers and consumers of rock and paleomagnetic data. 
Funded by NSF since 2003, MagIC forms a major part of https://earthref.org which integrates four independent cyber-initiatives rooted in various parts of the Earth, Ocean and Life sciences and education.
          </p>
          <p>
           <b> Database Technologies and Features </b><br/>
            MagIC has completed the transition from an Oracle backed, Perl based, server-oriented website to an Elasticsearch backed, Meteor based thick client website technology stack. 
            This thick client system has enabled the creation of a sophisticated, app-like interface for uploading with active elements like column header suggestions, table rejection toggle switches, and "don't import this column" switchs. 
            On-the-fly data validation and online spreadsheet editing are some additional features that will be possible by using these software technologies. 
            Uploading data into the archive with comprehensive indexing and completing complicated search queries to obtain unique datasets are an order of magnitude quicker than the old system. 
            Searches return row level data over all contributions and the user can choose to download the rows meeting the search criteria from only a subset of tables, if desired. The selected data is available to be downloaded as either single text file of various formats or an Excel spreadsheet. 
            For effective inclusion in online data aggregators and search engines, an XML sitemap has been added to the website and contributions are served with schema.org and JSON-LD compliant data descriptions for indexing by Google Search, EarthCube’s Project 418, the European Plate Observing System, and any other entities that wish to query MagIC. 
            The introduction of the MagIC Data Model 3.0 reduces the time needed to understand its structure and simplifies the process of using it to contribute data to MagIC. 
            The number of tables has decreased from 31 to 9 and is now organized in 6 hierarchical levels from the raw measurements up to the publication metadata. 
            This data model, along with method codes and vocabulary lists, can be browsed via the MagIC website, downloaded as JSON files for reuse, and can be easily updated by the MagIC team by request from the community via either email or reporting an issue at the MagIC GitHub repository.
          </p>
          <p>
            MagIC is supported by many people and organizations. The core group supported by NSF grants:<br/>
          </p>
        <Grid columns={6}>
          <Grid.Row>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#cconstable">
              <div className="ui huge icon bordered rounded image" data-tooltip="Institute for Geophysics and Planetary Physics, SIO, UCSD" >
                <img src="/MagIC/people/cconstable.jpg" />
              </div><br/>
              Cathy Constable
              <div className="sub header">Professor at<br/>SIO, UCSD</div>
            </a>
            </Grid.Column>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#ltauxe">
              <div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
                <img src="/MagIC/people/ltauxe.jpg" />
              </div><br/>
              Lisa Tauxe
              <div className="sub header">Distinguished Professor at<br/>SIO, UCSD</div>
            </a>
            </Grid.Column>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#akoppers">
              <div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
                <img src="/MagIC/people/akoppers.jpg" />
              </div><br/>
              Anthony Koppers
              <div className="sub header">Professor at<br/>CEOAS, OSU</div>
            </a>
            </Grid.Column>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#njarboe">
              <div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
                <img src="/MagIC/people/njarboe.jpg" />
              </div><br/>
              Nick Jarboe
              <div className="sub header">Data Analyst at<br/>SIO, UCSD</div>
            </a>
            </Grid.Column>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#rminnet">
              <div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
                <img src="/MagIC/people/rminnett.jpg" />
              </div><br/>
              Rupert Minnett
              <div className="sub header">Programmer via<br/>CEAOS, OSU</div>
            </a>
            </Grid.Column>
            <Grid.Column>
                <a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#ljonestrask">
              <div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
                <img src="/MagIC/people/ljonestrask.jpg" />
              </div><br/>
              Lori Jonestrask
              <div className="sub header">Programmer at<br/>SIO, UCSD</div>
            </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <p>
        Additional people who have contributed to the project:
        <ul>
         <li><a href="http://earthref.org/erml/7441">Nick Swanson-Hysell</a></li>
         <li><a href="http://earthref.org/erml/6899">Ron Shaar</a></li>
         <li><a href="http://earthref.org/erml/8184">Luke Fairchild</a></li>
         <li><a href="http://earthref.org/erml/8260">Kevin Gaastra</a></li>
        </ul>
        along with many others.
        </p>
      </div>
    );
  }

}

