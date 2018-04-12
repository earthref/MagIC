import React from 'react';
import {Link} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import IconButton from '/client/modules/common/components/icon_button';

export default class extends React.Component {

  render() {
    return (
        <div>
          <p>
            The Magnetics Information Consortium (MagIC) improves research capacity in the Earth and Ocean sciences by maintaining an open community digital data archive for rock and paleomagnetic data with portals that allow users access to archive, search, visualize, and download these data. MagIC supports the international rock and paleomagnetic communities and endeavors to bring data out of private archives, making them accessible to all and (re-)useable for new, creative, collaborative scientific and educational activities. MagIC is inherently domain-specific and directed by PIs who are both producers and consumers of rock and paleomagnetic data. MagIC has been funded by NSF since 2003 and forms a major part of https://earthref.org which integrates four independent cyber-initiatives rooted in various parts of the Earth, Ocean and Life sciences and education.
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
        Other people who have contributed greatly to the project:
        <ul>
         <li><a href="http://earthref.org/erml/7441">Nick Swanson-Hysell</a></li>
         <li><a href="http://earthref.org/erml/6899">Ron Shaar</a></li>
         <li><a href="http://earthref.org/erml/8184">Luke Fairchild</a></li>
         <li><a href="http://earthref.org/erml/8260">Kevin Gaastra</a></li>
        </ul>
        along with many others.
        </p>

        <h3> Grand Challenges </h3>
        <p>We provide resources for work on these and other scientific grand challenges:<br/>
        <ul>
          <li> The Geomagnetic and Thermal History of the Earth </li>
          <li> True Polar Wander and Plumes </li>
          <li> Understanding Interactions Between Magnetic Field and Climate </li>
          <li> Biogeomagnetism </li>
          <li> Environmental Magnetism, Dust and Rainfall </li>
          <li> Magnetism at High Pressures and in Extraterrestrial Bodies </li>
        </ul>
        </p>
        <p> Detailed <Link to="/MagIC/grand-challenges">descriptions</Link> of the Grand Challenges.  </p>
      </div>
    );
  }

}

