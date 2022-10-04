import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Item, Label} from 'semantic-ui-react';

import { portals } from '/lib/configs/portals.js';

class UserItem extends React.Component {

  constructor(props) {
    super(props);
  }

  portalColor() {
    return portals[this.props.portal].color || 'green';
  }

  render() {
    let {portal, id, ...props} = this.props;

    return (
      <Item className='er-user' {...props}>
        <Item.Image size='small' src={users[id].avatar}/>
        <Item.Content>
          <Item.Header as='a'>{users[id].name.first} {users[id].name.last}</Item.Header>
          <Item.Meta>
            {users[id].position}
          </Item.Meta>
          <Item.Meta className="affiliation">
            {users[id].affiliation}
          </Item.Meta>
          <Item.Description>
            {users[id].badges.map((badge, i) =>
              <Label basic content={<div dangerouslySetInnerHTML={{__html: badge}}/>} key={i}/>
            )}
            { users[id].note && <p dangerouslySetInnerHTML={{__html: users[id].note}}/> }
            { users[id].bio && <p dangerouslySetInnerHTML={{__html: users[id].bio}}/> }
          </Item.Description>
          <Item.Extra>
            { users[id].email && 
              <Label as='a' href={'mailto:' + users[id].email}>
                <i className='mail icon' />
                {users[id].email}
              </Label>
            }
            { users[id].website && 
              <Label as='a' href={users[id].website} target='_blank'>
                <i className='globe icon' />
                {users[id].website}
              </Label>
            }
            { users[id].orcid &&
              <Label as='a' image href={'https://orcid.org/' + users[id].orcid}>
                <img src='/ORCIDiD_icon64x64.png'/>
                {'https://orcid.org/' + users[id].orcid}
              </Label>
            }
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }

}

UserItem.propTypes = {
  portal:    PropTypes.oneOf(_.keys(portals)),
  className: PropTypes.string
};

export default UserItem;

const users = {
  "njarboe": {
    "name": {
      "first": "Nick",
      "last": "Jarboe"
    },
    "avatar": "/MagIC/people/njarboe.jpg",
    "position": "Data Analyst",
    "affiliation": "College of Earth, Ocean and Atmospheric Science, Oregon State University",
    "badges": [
      "Science Community Relations and Outreach", 
      "Data Analyst", 
      "Science-on-Schema.org Interoperability Standards", 
      "Website Content", 
      "MagIC Workshops", 
      "PmagPy Data Integration"
    ],
    "email": "njarboe@ucsd.edu",
    "orcid": "0000-0003-1465-9394",
    "note": "Please contact him for questions about data uploading, problems with the website, data accuracy, questions about the data model, how to install and use the PmagPy software, requests for additions to MagIC's controlled vocabulary lists, requests for new data columns, or questions about the MagIC workshops and related videos.",
    "bio": "Nick Jarboe joined the MagIC team in 2011. He has a Ph.D. in Earth Science from UC Santa Cruz with a thesis on the behavior of the magnetic field during the Steens reversal (16.7 Ma) and the precise dating of the reversal using the <sup>40</sup>Ar/<sup>39</sup>Ar method on primarily plagioclase crystals from basalts."
  },
  "rminnett": {
    "name": {
      "first": "Rupert",
      "last": "Minnett"
    },
    "avatar": "/MagIC/people/rminnett.jpg",
    "position": "Software Developer",
    "affiliation": "College of Earth, Ocean and Atmospheric Science, Oregon State University",
    "badges": [
      "MagIC Database", 
      "MagIC API",
      "Custom Scientific Software",
      "Data Visualization",
      "Machine Learning"
    ],
    "email": "rminnett@earthref.org",
    "orcid": "0000-0002-9000-2100",
    "bio": "Rupert Minnett joined the MagIC team in 2005. He has a Ph.D. in computer engineering from UC San Diego with a thesis in biologically-inspired machine learning and computer vision. His primary interest is in enabling science with custom software solutions."
  },
  "nswanson-hysell": {
    "name": {
      "first": "Nick",
      "last": "Swanson-Hysell"
    },
    "avatar": "/MagIC/people/nswanson-hysell.jpg",
    "position": "Associate Professor of Earth and Planetary Science",
    "affiliation": "Earth and Planetary Science, University of California, Berkeley",
    "badges": [
      "Paleogeography", 
      "Geomagnetic Field Evolution", 
      "Earth History", 
      "Long-term Climate Drivers"
    ],
    "email": " swanson-hysell@berkeley.edu",
    "orcid": "0000-0003-3215-4648",
    "website": "http://www.swanson-hysell.org"
  },
  "akoppers": {
    "name": {
      "first": "Anthony",
      "last": "Koppers"
    },
    "avatar": "/MagIC/people/akoppers.jpg",
    "position": "Professor of Geology and Geophysics and Associate Dean for Research Operations",
    "affiliation": "College of Earth, Ocean and Atmospheric Sciences, Oregon State University",
    "badges": [
      "Hotspots", 
      "Tectonics", 
      "Mantle Geodynamics and Plumes", 
      "<sup>40</sup>Ar/<sup>39</sup>Ar Geochronology", 
      "Online Data Curation",
      "Isotope Geochemistry"
    ],
    "email": "akoppers@ceoas.oregonstate.edu",
    "orcid": "0000-0002-8136-5372",
    "website": "https://ceoas.oregonstate.edu/profile/koppers"
  },
  "mbrown": {
    "name": {
      "first": "Max",
      "last": "Brown"
    },
    "avatar": "/MagIC/people/mbrown.jpg",
    "position": "Research Associate Professor",
    "affiliation": "Institute for Rock Magnetism (IRM), University of Minnesota",
    "badges": [
      "Paleomagnetism and Geomagnetism"
    ],
    "email": "mcbrown@umn.edu",
    "orcid": "0000-0003-0753-397X",
    "website": "https://sites.google.com/site/maxwellbrownpalaeomagnetism"
  },
  "jfeinberg": {
    "name": {
      "first": "Josh",
      "last": "Feinberg"
    },
    "avatar": "/MagIC/people/jfeinberg.jpg",
    "position": "Professor of Earth and Environmental Sciences",
    "affiliation": "Earth and Environmental Sciences and the Institute for Rock Magnetism (IRM), University of Minnesota",
    "badges": [
      "Rock Magnetism",
      "Paleomagnetism and Geomagnetism"
    ],
    "email": "feinberg@umn.edu",
    "orcid": "",
    "website": "https://cse.umn.edu/esci/joshua-feinberg"
  },
  "psolheid": {
    "name": {
      "first": "Peat",
      "last": "Solheid"
    },
    "avatar": "/MagIC/people/psolheid.jpg",
    "position": "Senior Scientist",
    "affiliation": "Institute for Rock Magnetism (IRM), University of Minnesota",
    "badges": [
      "Rock Magnetism"
    ],
    "email": "peat@umn",
    "orcid": "",
    "website": "https://cse.umn.edu/irm/peter-solheid"
  },
  "cconstable": {
    "name": {
      "first": "Cathy",
      "last": "Constable"
    },
    "avatar": "/MagIC/people/cconstable.jpg",
    "position": "Professor of Geophysics",
    "affiliation": "Institute of Geophysics and Planetary Physics, Scripps Institution of Oceanography, UC San Diego",
    "badges": [
      "Paleomagnetism and Geomagnetism",
      "Secular Variation and Reversals of the Geomagnetic Field",
      "Inverse Problems",
      "Applications of Statistical Techniques in Geophysics",
      "Electrical Conductivity of the Mantle",
      "Paleo and Rock Magnetic Databases"
    ],
    "email": "cconstable@ucsd.edu",
    "orcid": "0000-0003-4534-4977",
    "website": "http://scrippsscholars.ucsd.edu/cconstable"
  },
  "ltauxe": {
    "name": {
      "first": "Lisa",
      "last": "Tauxe"
    },
    "avatar": "/MagIC/people/ltauxe.jpg",
    "position": "Professor Emerita of Geophysics",
    "affiliation": "Geoscience Research Division, Scripps Institution of Oceanography, UC San Diego",
    "badges": [
      "Paleomagnetism",
      "Rock Magnetism",
      "Magnetostratigraphy",
      "Paleointensity",
      "Archaeomagnetism",
      "Ancient Geomagnetic Field"
    ],
    "email": "ltauxe@ucsd.edu",
    "orcid": "0000-0002-4837-8200",
    "website": "http://scrippsscholars.ucsd.edu/ltauxe"
  },
}
