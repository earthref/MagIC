import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {

  render() {
    return (
      <div className="ui icon error message">
        <i className="warning sign icon"/>
        <div className="header">
          {this.props.title}
        </div>
        {this.props.children}
      </div>
    );
  }

}

Error.propTypes = {
  title: PropTypes.string.isRequired
};

export default Error;
