import React from 'react';

export default class extends React.Component {

  render() {
    const {portal} = this.props;
    return (
      <div>
        <h1>{portal}</h1>
        <p>
          The website for Earth Science reference data and models.
        </p>
        <div>
          <ul>
            <li>
              MagIC
            </li>
          </ul>
        </div>
        <a className="ui button" href="/MagIC/">
          MagIC
        </a>
      </div>
    )
  }

}

