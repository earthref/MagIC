import React from 'react';
import {magicVersions} from '../configs/magic_versions.js';

export default class extends React.Component {

  render() {
    let {version} = this.props;
    return (
      <div className="ui basic buttons">
        <div className="ui disabled button">Version</div>
        {magicVersions.slice().reverse().map((v,i) => {
          const classes = (v === version ? 'active ' : '') + 'ui button';
          return (<a key={i} className={classes} href={`../${v}/`}>{v}</a>);
        })}
      </div>
    )
  }

}

