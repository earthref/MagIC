import React from 'react';
import MagICContribution from '../components/contribution';

export default class extends React.Component {

  render() {
    return (
      <div>
        {this.props.contributions.map((c, i) => (
          <MagICContribution contribution={c} index={i} key={c.contribution_id}/>
        ))}
      </div>
    );
  }
}