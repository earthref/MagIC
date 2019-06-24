import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Item, Label} from 'semantic-ui-react';

import { portals } from '/lib/configs/portals.js';

class User extends React.Component {

  constructor(props) {
    super(props);
  }

  portalColor() {
    return portals[this.props.portal].color || 'green';
  }

  render() {
    let {portal, ...props} = this.props;

    return (
      <div className='er-user' {...props}>
        <Item.Group>
          <Item>
            <Item.Image src='/MagIC/people/rminnett.jpg'/>
            <Item.Content>
              <Item.Header as='a'>Rupert Minnett</Item.Header>
              <Item.Meta>
                Data Analyst at the Scripps Institution of Oceanography, UC San Diego
              </Item.Meta>
              <Item.Description>
                <Label basic content='Science Community Relations and Outreach' />
                <Label basic content='Data Analyst' />
                <Label basic content='Website Content' />
                <Label basic content='MagIC Workshops' />
                <Label basic content='PmagPy Data Integration' />
                <p>
                  Please contact him for questions about data uploading, problems with the website, data accuracy, questions about the data model, how to install and use the PmagPy software, requests for additions to MagIC's controlled vocabulary lists, requests for new data columns, or questions about the MagIC workshops and related videos.
                </p>
                <p>
                  Nick joined the MagIC team in 2011. He has a Ph.D. in Earth Science from UC Santa Cruz with a thesis on the behavior of the magnetic field during the Steens reversal (16.7 Ma) and the precise dating of the reversal using the <sup>40</sup>Ar/<sup>39</sup>Ar method on primarily plagioclase crystals from basalts.
                </p>
              </Item.Description>
              <Item.Extra>
                <Label as='a' href='mailto:njarboe@ucsd.edu'>
                  <i className='mail icon' />
                  njarboe@ucsd.edu
                </Label>
                <Label as='a' image href='https://orcid.org/0000-0003-1465-9394'>
                  <img src='/ORCIDiD_icon64x64.png'/>
                  https://orcid.org/0000-0003-1064-6932
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }

}

User.propTypes = {
  portal:    PropTypes.oneOf(_.keys(portals)),
  className: PropTypes.string
};

export default User;