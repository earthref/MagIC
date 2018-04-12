import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         <b>Other Paleo/Geo/Rock Magnetic Related Databases</b><br/>
         {/* <a href="http://www.ngu.no/geodynamics/gpmdb/">DRAGON Online</a><br/> */}
         <a href="http://geomagia.gfz-potsdam.de/">GEOMAGIA50</a><br/>   
         <a href="http://www.ngdc.noaa.gov/geomag/paleo.shtml">IAGA Geomagnetic Databases</a><br/>  
         <a href="http://denali.gsfc.nasa.gov/terr_mag/magnpetr.html">Magnetic Petrology Database for Interpretation of Satellite Magnetic Anomalies</a><br/>
         <a href="http://h175.it.helsinki.fi/database/">PALEOMAGIA</a><br/>
         <a href="http://earth.liv.ac.uk/pint/">PINT</a><br/>   
        </p>
        <p>
         <b>Software Tools</b><br/>
         <a href="https://earthref.org/tools/forcinel.htm">FORCinel</a><br/>
         <a href="https://earthref.org/tools/thelliertool.htm">ThellierTool</a><br/>
         <a href="https://wserv4.esc.cam.ac.uk/nanopaleomag/?page_id=193">VARIFORC</a><br/>
        </p>
        <p>
         <b>Organizations</b><br/>
         <a href="http://geopaleomagnetism.agu.org/">American Geophysical Union - GPE</a><br/>
         <a href="https://www.egu.eu/emrp/home/">European Geosciences Union - EMRP</a><br/>
         <a href="http://www.irm.umn.edu/index.html">Institute for Rock Magnetism</a><br/>
         <a href="http://www.intermagnet.org/index-eng.php">Intermagnet</a><br/>
        </p>
         <a href=""></a><br/>
        <p>
        </p>
      </div>
    );
  }

}

