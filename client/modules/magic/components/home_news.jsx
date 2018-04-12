import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import {portals} from '/lib/configs/portals.js';

export default class extends React.Component {

  render() {
    return (
      <div style={{textAlign: "justify"}}>
        <h3>
          <Image size="mini" src="/MagIC/egu.png" floated="left"/>
          {` MagIC at EGU`}
        </h3>
        <p>
          {`Visit us at the `}
          <a href="https://www.egu2018.eu/" target="_blank"><b>EGU General Assembly 2018</b></a>
          {` where our poster `}
          <b>EGU2018-11767</b>
          {` `}
          <em>MagIC’s Migration to a Simplified Data Model and Updated Open Source 
            Technologies Improves Community Engagement, Website Responsiveness, and 
            Development Times</em>
          {` is in `}
          <b>Session EMRP3.5</b>
          {` `}
          <em>Geomagnetic field variations in ancient times: new paleo/archeomagnetic data 
            and models to disclose fundamental properties of the Earth's magnetic field</em>
          {` at poster `}
          <b>119 Hall X2</b>
          {` and we will be there `}
          <b>Monday, 09 Apr 2018, 17:30-19:00</b>.
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/ec.jpg" floated="left"/>
          {` Project 418`}
        </h3>
        <p>
          {`MagIC is working with EarthCube `}
          <a href="https://geodex.org" target="_blank"><b>Project 418</b></a>
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
          <Image size="mini" src="/MagIC/agu.jpg" floated="left"/>
          {` MagIC at AGU`}
        </h3>
        <p>
          {`MagIC presented several posters at the `}
          <a href="https://fallmeeting.agu.org/2017/" target="_blank"><b>AGU 2017 Fall Meeting</b></a>
          {` including two eLightning talks where the new MagIC website and the `}
          <Link to="/MagIC/data-models/3.0"><b>3.0 Data Model</b></Link>
          {` were discussed. Thanks to those who attended  
          and the fruitful discussions about the progress made on improving the MagIC website to make searching and contributing easier and updating `}
          <a href="https://earthref.org/PmagPy/cookbook/"><b>PmagPy</b></a>
          {` to use the new data model.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/sio.jpg" floated="left"/>
          {` 2017 MagIC Workshop`}
        </h3>
        <p>
          {`MagIC hosted the `}
          <a href="https://earthref.org/events/MAGIC/2017/"><b>2017 Workshop: Earth's Magnetic Field from the Beginning</b></a>
          {` on `}
          <b>January 24th-27th, 2017</b>
          {` at SIO in La Jolla, CA. It consisted of two days of `}
          <a href="https://www.youtube.com/watch?v=ZL3yh2_aY4w&list=PLirL2unikKCi9u90CHr8o06QC_AsD-cup" target="_blank"><b>science talks</b></a>
          {` followed by two days of hands-on tutorials, during which participants worked on `}
          <Link to="/MagIC/upload"><b>uploading</b></Link>
          {` data into their `}
          <Link to="/MagIC/private"><b>private workspace</b></Link>
          {` for contribution to the MagIC database and using the `}
          <a href="https://earthref.org/PmagPy/cookbook/"><b>PmagPy</b></a>
          {` paleomagnetic software suite.`}
        </p>
      </div>
    );
  }

}
