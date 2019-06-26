import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Card, Item, Label, Image} from 'semantic-ui-react';

import User from '/client/modules/common/components/user';

export default class extends React.Component {

  render() {
    return (
      <div>
        <Item.Group divided>
          <User portal="MagIC" id="njarboe"/>
          <User portal="MagIC" id="rminnett"/>
          <User portal="MagIC" id="ljonestrask"/>
          <User portal="MagIC" id="cconstable"/>
          <User portal="MagIC" id="akoppers"/>
          <User portal="MagIC" id="ltauxe"/>
        </Item.Group>
      </div>
	  );
  }

}
