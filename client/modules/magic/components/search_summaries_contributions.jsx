import React from 'react';
import MagICContribution from '../components/contribution';

const MagICSearchSummariesContributions = ({contributions}) => (
  <div>
    {contributions.map((c, i) => (
      <MagICContribution contribution={c} key={c.magic_contribution_id}/>
    ))}
  </div>
);

export default MagICSearchSummariesContributions;