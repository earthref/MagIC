import React from 'react';
import numeral from 'numeral';

export default (({className, style, count, singular, plural, error, noNumeral}) => {
  if (error !== undefined)
    return <span className={className} style={style} data-tooltip={error}><i className="red large warning circle icon" style={{margin: 0}}></i></span>;
  if (count !== undefined)
    return <span className={className} style={style}>
      {!noNumeral && numeral(count).format('0,0')} {count === 1 && singular}{count !== 1 && plural}
    </span>;
  else
    return <span className={className} style={style}>
      <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
    </span>;
});
