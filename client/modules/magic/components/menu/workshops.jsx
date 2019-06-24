import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         MagIC has hosted workshops in 2011, 2014 and 2017 at the Scripps Institution of Oceanography in La Jolla, California. The format is generally two days of science talks followed by a few days of hands-on tutorials. During the tutorials we give presentations working on uploading data into the MagIC database and using the PmagPy paleomagnetic software suite. There is plenty of time given to one-on-one interaction with the MagIC team for help or to give us suggestions. <br/>
        </p>
        <p>
         <b>2020 MagIC Workshop</b><br/>
           We plan to host another workshop in 2020. We like to have at least one day of talks on a related theme. If you have suggestions for the workshop, please feel free to <Link style={{color: 'purple'}} to={'contact'}>email us</Link> with suggestions.<br/>
        </p>
        <p>
         <b>2017 MagIC Workshop</b><br/>
         For a detailed description, schedule, and list of participants of the 2017 workshop, you can visit
         its <a href='https://earthref.org/events/MAGIC/2017/'>homepage</a>.<br/>
         Videos of many of the talks can be found on our <a href='https://www.youtube.com/channel/UC-DbvhEu49a6dZXdvUWorhQ'>YouTube channel</a>.
        </p>
      </div>
    );
  }

}

