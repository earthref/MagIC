import React from 'react';
import numeral from 'numeral';

export default (({count, error}) => {
  if (error !== undefined)
    return <span data-tooltip={error}><i className="red large warning circle icon" style={{margin: 0}}></i></span>;
  if (count !== undefined)
    return <div>
      {numeral(count).format('0,0')}
    </div>;
  else
    return <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>;
});