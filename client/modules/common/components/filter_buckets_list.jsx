import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <table style={{width: '100%'}}><tbody>
        {this.props.buckets.map((bucket, i) => (
          <tr key={i}>
            <td>
              <a href="#"><b>{bucket.key}</b></a>
            </td>
            <td>
              <div className="ui circular small basic right floated label">
                {bucket.doc_count}
              </div>
            </td>
          </tr>
        ))}
      </tbody></table>
    );
  }
}