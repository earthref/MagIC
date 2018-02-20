import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
        At its heart, MagIC is a datastore for the paleomagnetic, geomagnetic, and rock magnetic community.
        It allows for the uploading of data for archiving on a per-publication basis and downloading of data using a sophisticated search system. 
        Data can be uploaded to a private workspace before the associated paper is published and this private version can be shared with co-authors, journal editors, and reviews via a URL. 
        The search system currently has over a dozen filters and the data are available for download in the MagIC file format. This file format can be used natively in the paleomagnetic software suite PmagPy and other programs.
        </p>
        <p>MagIC is supported by many people and organizations. The core group supported by NSF MagIC grants includes:<br/>
        <ul>
         <li><Link to="/MagIC/contact">Cathy Constable</Link></li>
         <li><Link to="/MagIC/contact">Lisa Tauxe</Link></li>
         <li><Link to="/MagIC/contact">Anthony Koppers</Link></li>
         <li><Link to="/MagIC/contact">Nick Jarboe</Link></li>
         <li><Link to="/MagIC/contact">Rupert Minnett</Link></li>
         <li><Link to="/MagIC/contact">Lori Jonestrask</Link></li>
        </ul>
        Other people who have contributed greatly to the project include:
        <ul>
         <li><a href="http://earthref.org/erml/7441">Nick Swanson-Hysell</a></li>
         <li><a href="http://earthref.org/erml/6899">Ron Shaar</a></li>
         <li><a href="http://earthref.org/erml/8184">Luke Fairchild</a></li>
         <li><a href="http://earthref.org/erml/8260">Kevin Gaastra</a></li>
        </ul>
        along with many others.
        <h3> Grand Challenges </h3>
        </p>
        <p>We provide resources for work on some scientific grand challenges:<br/>
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

