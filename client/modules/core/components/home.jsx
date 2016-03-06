import React from 'react';

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1>EarthRef.org</h1>
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
        <button className="ui button">
          Follow
        </button>
      </div>
    );
  }
});

export default Home;
