import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import {portals} from '/lib/configs/portals.js';

export default class extends React.Component {

  render() {
    return (
      <div style={{textAlign: "justify"}}>
        <h3>
          <Image size="mini" src="/MagIC/sio.jpg" floated="left"/>
          {` 2020 MagIC Workshop`}
        </h3>
        <p>
          {`MagIC is hosting the `}
          <a href="https://earthref.org/events/MAGIC/2020/"><b>2020 Workshop: Rock and Paleomagnetism through Time and Space</b></a>
          {` on `}
          <b>March 16th-18th, 2020</b>
          {` at SIO in La Jolla, CA. It consists of two days of `} <b>science talks</b>
          {` followed by a day of hands-on tutorials, during which participants will work on `}
          <Link to="/MagIC/upload"><b>uploading</b></Link>
          {` data into their `}
          <Link to="/MagIC/private"><b>private workspace</b></Link>
          {` for contribution to the MagIC database and practice using the `}
          <a href="https://earthref.org/PmagPy/cookbook/"><b>PmagPy</b></a>
          {` paleomagnetic software suite.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/agu.jpg" floated="left"/>
          {` MagIC at AGU`}
        </h3>
        <p>
          {`MagIC presented an `}
          <a href="https://agu.confex.com/agu/fm19/meetingapp.cgi/Paper/548126" target="_blank"><b>eLightning talk</b></a>
          {` on Tuesday morning at 10:20 AM (`}
          <b>IN22B-01</b>
          {` - `}
          <i>Thorough Annotation of Magnetics Information Consortium (MagIC) Contributions with Schema.org Structured Metadata</i>
          {`) and a `}
          <a href="https://agu.confex.com/agu/fm19/meetingapp.cgi/Paper/560891" target="_blank"><b>poster</b></a>
          {` on Thursday afternoon (`}
          <b>GP43A-0788</b>
          {` - `}
          <i>Magnetics Information Consortium (MagIC) Database Interoperability Improvements: ORCID, EarthCube, Google, and PmagPy</i>
          {`) at the `}
          <a href="https://www.agu.org/fall-meeting" target="_blank"><b>2019 AGU Fall Meeting</b></a>
          {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/ec.jpg" floated="left"/>
          {` Project 419 / GeoCODES`}
        </h3>
        <p>
          {`MagIC is working with EarthCube `}
          <a href="https://www.earthcube.org/geocodes" target="_blank"><b>GeoCODES</b></a>
          {` to publish `}
          <a href="https://json-ld.org/" target="_blank"><b>JSON-LD</b></a>
          {` contribution metadata. MagIC is providing a rich selection of HTML5 microdata `}
          <a href="https://schema.org/" target="_blank"><b>schema.org</b></a>
          {` parameters for its versioned datasets and associated references. These embedded metadata are also suitable for crawling by the `}
          <a href="https://www.epos-ip.org/" target="_blank"><b>European Plate Observing System</b></a>
          {` and `}
          <a href="https://developers.google.com/search/docs/guides/intro-structured-data" target="_blank"><b>Google Search with Structured Data</b></a>
          {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/egu.png" floated="left"/>
          {` MagIC at EGU`}
        </h3>
        <p>
          {`MagIC was part of the `}
          <a href="https://www.egu2018.eu/" target="_blank"><b>EGU General Assembly 2018</b></a>
          {` where our poster `}
          <b>EGU2018-11767</b>
          {` `}
          <em>MagIC’s Migration to a Simplified Data Model and Updated Open Source 
            Technologies Improves Community Engagement, Website Responsiveness, and 
            Development Times</em>
          {` was in `}
          <b>Session EMRP3.5</b>
          {` `}
          <em>Geomagnetic field variations in ancient times: new paleo/archeomagnetic data 
            and models to disclose fundamental properties of the Earth's magnetic field</em>
          {`. We met with representives of the `}
          <a href="https:https://www.epos-ip.org/" target="_blank"><b>European Plate Observing System (EPOS)</b></a>
          {` and other groups to discuss how best to interoperate with the evolving `}
          <b>EPOS</b> 
          {` project and how `}
          {`MagIC can be a data store for European researchers who wish to share data via `}
          <b>EPOS</b> 
          {`.`}
        </p>
      </div>
    );
  }

}
