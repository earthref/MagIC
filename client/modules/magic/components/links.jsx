import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         <b>Other Paleo/Geo/Rock Magnetic Related Databases</b><br/>
         {/* <a href="http://www.ngu.no/geodynamics/gpmdb/"><font color="purple">DRAGON Online</font></a><br/> */}
         <a href="http://geomagia.gfz-potsdam.de/"><font color="purple">GEOMAGIA50</font></a><br/>   
         <a href="http://www.ngdc.noaa.gov/geomag/paleo.shtml"><font color="purple">IAGA Geomagnetic Databases</font></a><br/>  
         <a href="http://denali.gsfc.nasa.gov/terr_mag/magnpetr.html"><font color="purple">Magnetic Petrology Database for Interpretation of Satellite Magnetic Anomalies</font></a><br/>
         <a href="http://h175.it.helsinki.fi/database/"><font color="purple">PALEOMAGIA</font></a><br/>
         <a href="http://earth.liv.ac.uk/pint/"><font color="purple">PINT</font></a><br/>   
        </p>
        <p>
         <b>Software Tools</b><br/>
         <a href="https://earthref.org/tools/forcinel.htm"><font color="purple">FORCinel</font></a><br/>
         <a href="https://earthref.org/tools/thelliertool.htm"><font color="purple">ThellierTool</font></a><br/>
         <a href="https://wserv4.esc.cam.ac.uk/nanopaleomag/?page_id=193"><font color="purple">VARIFORC</font></a><br/>
        </p>
        <p>
         <b>Organizations</b><br/>
         <a href="http://geopaleomagnetism.agu.org/"><font color="purple">American Geophysical Union - GPE</font></a><br/>
         <a href="https://www.egu.eu/emrp/home/"><font color="purple">European Geosciences Union - EMRP</font></a><br/>
         <a href="http://www.irm.umn.edu/index.html"><font color="purple">Institute for Rock Magnetism</font></a><br/>
         <a href="http://www.intermagnet.org/index-eng.php"><font color="purple">Intermagnet</font></a><br/>
        </p>
         <a href=""><font color="purple"></font></a><br/>
        <p>
        </p>
      </div>
    );
  }

}

