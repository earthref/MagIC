import React from 'react';

export default class extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onDidUpdate)
      this.props.onDidUpdate();
  }

  renderLoading() {
    return (
      <tbody>
        {_.times(this.props.pageSize, (i) =>
          <tr key={i}>
            <td colSpan={this.props.columns && this.props.columns.length || 1}>
              <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i> Loading
            </td>
          </tr>
        )}
      </tbody>
    );
  }

  renderNoRows() {
    return (
      <tbody>
        <tr className="warning">
          <td colSpan={this.props.columns && this.props.columns.length || 1}>
            No Rows to Display
          </td>
        </tr>
      </tbody>
    );
  }

  renderRows() {
    return (
      <tbody>
        {this.props.rows.map((rows, i) =>
          [this.props.titles[i]].concat(rows).map((row, j) =>
            <tr key={i + '_' + j}>
              {j === 0 ?
                <th colSpan={this.props.columns && this.props.columns.length || 1}
                    style={{paddingTop: '0.75em', paddingBottom: '0.25em', fontWeight: 'normal', borderTop: '1px solid rgba(34, 36, 38, 0.15)'}}
                    dangerouslySetInnerHTML={{__html: row}}
                >
                </th>
                :
                this.props.columns.map((column, k) =>
                  <td key={k}
                      style={_.extend({whiteSpace: 'nowrap'}, this.props.groupBorders[k - 1] ? {borderLeft: '1px solid #AAAAAA'} : {})}>
                    {row[column]}
                  </td>
                )
              }
            </tr>
          )
        )}
      </tbody>
    );
  }

  render() {
    //if (this.props.rows) console.log('rows', this.props.rows);
    if (!this.props.rows) return this.renderLoading();
    else if (this.props.rows.length === 0) return this.renderNoRows();
    else return this.renderRows();
  }
}