import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         <b>Other Paleo/Geo/Rock Magnetic Related Databases</b><br/>
         {/* <a href="http://www.ngu.no/geodynamics/gpmdb/">DRAGON Online</a><br/> */}
         <a href="http://geomagia.gfz-potsdam.de/">GEOMAGIA50</a> - A paleomagnetic and chronological database for the past 50 ka - Maxwell Brown<br/>   
         {/* <a href="http://www.ngdc.noaa.gov/geomag/paleo.shtml">IAGA geomagnetic databases</a> - compiled in the late 90' early 2000's (<a href="https://www.ngdc.noaa.gov/geomag/data/paleo/gpmdb_46.zip" >GPMDB 4.6</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver3.5">Archeo</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver3.5">Magst</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver3.5">Pint</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver4.1">PSVRL</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver3.5">Secvr</a>, <a href="ftp://ftp.ngdc.noaa.gov/geomag/Paleomag/access/ver3.5">Trans</a>)<br/> */}
         <a href="http://www.ngdc.noaa.gov/geomag/paleo.shtml">IAGA geomagnetic databases</a> - databases compiled in the late 90' early 2000's (GPMDB 4.6, Archeo, Magst, PintPSVRL, Secvr, and Trans)<br/>
         <a href="http://h175.it.helsinki.fi/database/">PALEOMAGIA</a> - Precambrian paleomagnetic pole database - Toni Veikkolainen<br/>
         <a href="http://earth.liv.ac.uk/pint/">PINT</a> - Absolute paleointensity database - Any Biggin<br/>   
        </p>
        <p>
         <b>Software Tools</b><br/>
         <a href="https://wserv4.esc.cam.ac.uk/nanopaleomag/?page_id=31">FORCinel</a> - Calculates first order reversal curve (FORC) diagrams from raw FORC data files - Richard Harrison<br/>
         <a href="https://earthref.org/PmagPy/cookbook/">PmagPy</a> - Open source Paleo and rock magnetic anaysis software for use on the command line, in Jupyter notebooks, or through stand alone GUIs. - Lisa Tauxe and others<br/>
         <a href="https://www.geophysik.uni-muenchen.de/research/magnetism/software">ThellierTool</a> - Roman Leonhardt<br/>
         <a href="https://wserv4.esc.cam.ac.uk/nanopaleomag/?page_id=193">VARIFORC</a> - Additional FORC diagram visualization tool. Starts with FORCinel files. - Ramon Egli<br/>
        </p>
        <p>
         <b>Organizations</b><br/>
         <a href="http://geopaleomagnetism.agu.org/">American Geophysical Union (AGU)</a> - The Geomagnetism, Paleomagnetism and Electromagnetism (GPE) section homepage<br/>
         <a href="https://www.egu.eu/emrp/home/">European Geosciences Union</a> - The Earth Magnetism & Rock Physics (EMRP) section<br/>
         <a href="http://www.irm.umn.edu/index.html">Institute for Rock Magnetism</a> - NSF funded rock magnetism rearch facility<br/>
         <a href="http://www.intermagnet.org/index-eng.php">International Real-time Magnetic Observatory Network (Intermagnet)</a> - Global network of earth based geomagnetic  observatories<br/>
        </p>
         <a href=""></a><br/>
        <p>
        </p>
      </div>
    );
  }

}

