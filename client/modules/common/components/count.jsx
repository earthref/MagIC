import React from 'react';
import numeral from 'numeral';

const Count = ({count}) => (
  <div>
    {numeral(count).format('0,0')}
  </div>
);

export default Count;