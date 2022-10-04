import React from 'react';
import {Item} from 'semantic-ui-react';

import UserItem from '/client/modules/common/components/user_item';

export default class extends React.Component {

  render() {
    return (
      <div>
        <Item.Group divided>
          <UserItem portal="MagIC" id="njarboe"/>
          <UserItem portal="MagIC" id="rminnett"/>
          <UserItem portal="MagIC" id="akoppers"/>
          <UserItem portal="MagIC" id="nswanson-hysell"/>
          <UserItem portal="MagIC" id="mbrown"/>
          <UserItem portal="MagIC" id="jfeinberg"/>
          <UserItem portal="MagIC" id="psolheid"/>
          <UserItem portal="MagIC" id="cconstable"/>
          <UserItem portal="MagIC" id="ltauxe"/>
        </Item.Group>
      </div>
	  );
  }
}
