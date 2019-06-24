import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Card, Item, Label, Image} from 'semantic-ui-react';

export default class extends React.Component {

  render() {
    return (
      <div>
        <Item.Group divided>
          <Item>
            <a href="#njarboe"></a>
            <Item.Image src='/MagIC/people/njarboe.jpg' />
            <Item.Content>
              <Item.Header as='a'>Nick Jarboe</Item.Header>
              <Item.Meta>
                Data Analyst at the Scripps Institution of Oceanography, UC San Diego
              </Item.Meta>
              <Item.Description>
                <Label basic content='Science Community Relations and Outreach' />
                <Label basic content='Data Analyst' />
                <Label basic content='Website Content' />
                <Label basic content='MagIC Workshops' />
                <Label basic content='PmagPy Data Integration' />
                <p style={{ textAlign: 'justify', marginTop: '.5em' }}>
                  Please contact him for questions about data uploading, problems with the website, data accuracy, questions about the data model, how to install and use the PmagPy software, requests for additions to MagIC's controlled vocabulary lists, requests for new data columns, or questions about the MagIC workshops and related videos.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Nick joined the MagIC team in 2011. He has a Ph.D. in Earth Science from UC Santa Cruz with a thesis on the behavior of the magnetic field during the Steens reversal (16.7 Ma) and the precise dating of the reversal using the <sup>40</sup>Ar/<sup>39</sup>Ar method on primarily plagioclase crystals from basalts.
                </p>
              </Item.Description>
              <Item.Extra>
                <Label as='a' href='mailto:njarboe@ucsd.edu'>
                  <i className='mail icon' />
                  njarboe@ucsd.edu
                </Label>
                <Label as='a' image href='https://orcid.org/0000-0003-1465-9394'>
                  <img src='/ORCIDiD_icon64x64.png' style={{ padding: '.3em' }}/>
                  https://orcid.org/0000-0003-1465-9394
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <p>
          <a href="#njarboe"></a>
          <b>Nick Jarboe</b> - <a href="mailto:njarboe@ucsd.edu">njarboe@ucsd.edu</a> - <a href="https://orcid.org/0000-0003-1465-9394" target="_blank"><img src="/ORCIDiD_icon64x64.png" style={{ width: '1em', height: '1em', verticalAlign: 'middle' }}/> https://orcid.org/0000-0003-1465-9394</a><br/>
          <b>Data Analyst at the Scripps Institution of Oceanography, UC San Diego</b><br/>
          Science community relations and outreach, data analyst, website content, MagIC workshops, PmagPy data integration.
        </p>
		    <p>
          Please contact him for questions about data uploading, problems with the website, data accuracy, questions about the data model, how to install and use the PmagPy software, requests for additions to MagIC's controlled vocabulary lists, requests for new data columns, or questions about the MagIC workshops and related videos.
        </p>
		    <p>
          Nick Jarboe joined the MagIC team in 2011. He has a Ph.D. in Earth Science from UC Santa Cruz with a thesis on the behavior of the magnetic field during the Steens reversal (16.7 Ma) and the precise dating of the reversal using the <sup>40</sup>Ar/<sup>39</sup>Ar method on primarily plagioclase crystals from basalts.
        </p>
        <p>
          <a href="#rminnett"></a>
          <b>Rupert Minnett</b> - <a href="mailto:rminnett@earthref.org">rminnett@earthref.org</a> - Software Development Contractor, College of Earth, Ocean and Atmospheric Science, Oregon State University.<br/>
	      Software developer for MagIC (Meteor, Elasticsearch, AWS, system administration), the MagIC API, custom data queries and updates.
        </p>
        <p>
          Rupert Minnett joined the MagIC team in 2005. He has a Ph.D. in computer engineering from UC San Diego with a thesis in biologically-inspired machine learning and computer vision. His primary interest is in enabling science with custom software solutions.
        </p>
        <p>
          <a href="#ljonestrask"></a>
          <b>Lori Jonestrask</b> - <a href="mailto:ljonestrask@ucsd.edu">ljonestrask@ucsd.edu</a> - Software Developer at the Scripps Institution of Oceanography, UC San Diego. <br/>
	      Software for PmagPy (Python, Windows and MacOS integration).
        </p>
		    <p>
          Please contact her to report software errors and installation problems with the PmagPy software suite. Issues can also be submitted directly on the <a href="https://github.com/PmagPy/PmagPy/issues" target="_blank">PmagPy GitHub</a> site. 
        </p>
        <p>
          Lori Jonestrask joined the MagIC team in 2014 and has worked closely with Lisa Tauxe and others in maintaining and adding features to the PmagPy software suite.   
        </p>
        <p>
          <b>GitHub</b> - Problems can also be reported directly by creating a new issue on the <a href="https://github.com/earthref/MagIC/issues" target="_blank">MagIC GitHub</a> site. 
          Nick Jarboe and Rupert Minnett will be automatically notified when a new issue is submitted.
        </p>
        <p>
          <h3>Principal Investigators</h3>
          <a href="#cconstable"></a>
          <b>Cathy Constable</b> - <a href="mailto:cconstable@ucsd.edu">cconstable@ucsd.edu</a> - Professor, Institute of Geophysics and Planetary Physics, Scripps Institution of Oceanography, UC San Diego.<br/>
          Research interests: paleomagnetism and geomagnetism, secular variation and reversals of the geomagnetic field, inverse problems, applications of statistical techniques in geophysics, electrical conductivity of the mantle, paleo and rock magnetic databases.<a href="http://scrippsscholars.ucsd.edu/cconstable" target="_blank">Website</a>
          <br/>
          <a href="#akoppers"></a>
          <b>Anthony Koppers</b> - <a href="mailto:akoppers@ceoas.oregonstate.edu">akoppers@ceoas.oregonstate.edu</a> - Professor and Associate Dean for Research Operations, College of Earth, Ocean and Atmospheric Sciences , Oregon State University.<br/> 
          Research interests: hotspots, tectonics, mantle geodynamics and plumes, <sup>40</sup>Ar/<sup>39</sup>Ar geochronology, online data 
          curation (<a href="https://earthref.org">earthref.org</a>, <Link to="/MagIC">MagIC</Link>), isotope geochemistry. <a href="http://ceoas.oregonstate.edu/profile/koppers/" target="_blank">Website</a>
          <br/>
          <a href="#ltauxe"></a>
          <b>Lisa Tauxe</b> - <a href="mailto:ltauxe@ucsd.edu">ltauxe@ucsd.edu</a> - Professor, Geoscience Research Divison, Scripps Institution of Oceanography, UC San Diego.<br/> 
          Research interests: paleomagnetism, rock magnetism, magnetostratigraphy, paleointensity, archaeomagnetism, ancient geomagnetic field. <a href="http://scrippsscholars.ucsd.edu/ltauxe" target="_blank">Website</a>
		    </p>
      </div>
	  );
  }

}

