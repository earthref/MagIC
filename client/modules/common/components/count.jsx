import React from 'react';
import numeral from 'numeral';

export default ({count}) => (
  <div>
    {numeral(count).format('0,0')}
  </div>
);