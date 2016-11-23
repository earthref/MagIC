import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <table><tbody>
        {this.props.buckets.map((bucket, i) => (
          <tr key={i}>
            <td>
              {bucket.key}
            </td>
            <td>
              <div className="ui circular small basic label">
                {bucket.doc_count}
              </div>
            </td>
          </tr>
        ))}
      </tbody></table>
    );
  }
}