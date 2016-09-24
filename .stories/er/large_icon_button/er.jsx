import React from 'react';

const buttonStyles = {
  margin: 10
};

const Button = ({ children, onClick }) => (
  <button
    className="ui green large button"
    style={buttonStyles}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Button;
