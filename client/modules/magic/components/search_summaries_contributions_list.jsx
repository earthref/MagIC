import React from 'react';
import MagICContribution from '../components/contribution';

export default class extends React.Component {

  render() {
    return (
      <div>
        <div className="ui divided list" style={{margin: 0}}>
          {this.props.contributions.map((c, i) => (
            <div className="item" key={c.contribution_id}>
              <MagICContribution contribution={c}/>
            </div>
          ))}
        </div>
        <div className="ui fitted divider"></div>
      </div>
    );
  }
}