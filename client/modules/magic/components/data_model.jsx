import React from 'react';
import {magicVersions} from '../configs/magic_versions.js';

export default class extends React.Component {

  render() {
    let {version} = this.props;
    return (
      <div>
        <div className="ui basic buttons">
          <div className="ui disabled button">Version</div>
          {magicVersions.slice().reverse().map((v,i) => {
            const classes = (v === version ? 'active ' : '') + 'ui button';
            return (<a key={i} className={classes} href={`../${v}/`}>{v}</a>);
          })}
        </div>
        <div className="ui warning message">
          TODO: get the {version} data model from a Mongo subscription and display it with a Semantic UI accordion.
        </div>
      </div>
    )
  }

}

