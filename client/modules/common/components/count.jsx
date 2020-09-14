import React from 'react';
import numeral from 'numeral';

export default (({count, singular, plural, error, noNumeral, ...props}) => {
  if (error !== undefined)
    return <span {...props} data-tooltip={error}><i className="red large warning circle icon" style={{margin: 0}}></i></span>;
  if (count !== undefined)
    return <span {...props}>
      {!noNumeral && numeral(count).format('0,0')} {count === 1 && singular}{count !== 1 && plural}
    </span>;
  else
    return <span {...props}>
      <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
    </span>;
});
