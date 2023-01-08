import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Message} from 'semantic-ui-react';

import {portals} from '/lib/configs/portals.js';

export default class extends React.Component {

  render() {
    return (
      <div style={{textAlign: "justify"}}>
        <h3>
          <Image size="mini" src="/MagIC/sio.jpg" floated="left"/>
          {` 2023 MagIC Workshop`}
        </h3>
        <p>
          {` MagIC will host its 2023 workshop from `}
          <b>Feb 28th to March 2nd, 2023</b>
          {` in La Jolla, California at the Scripps Institution of Oceanography, UCSD. The workshop, "`}
          <a href="https://earthref.org/events/MAGIC/2023/"><b>Magnetism and Earth History: Field Evolution, Environmental Change and Paleogeography</b></a>
          {`", consists of two days of science talks in four sessions and a day of MagIC related group working sessions. Please visit the `}
          <a href="https://earthref.org/events/MAGIC/2023/"><b>workshop website</b></a>
          {` for the full schedule and other workshop details. We welcome you to join us at the workshop by registering using this `} 
          <a href="https://docs.google.com/forms/d/1sCt0e-1vIwis7eNNHzDOZEm4nnUx8jcCAmyMm-NtDgg"><b>form</b></a>
          {`. There will be a poster session and reception on the evening of the first day.`} 
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/youtube.png" floated="left"/>
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><font color="000000">2020 MagIC Workshop Tutorial Videos</font></a>
        </h3>
        <p>
        {`In lieu of the postponed 2020 MagIC Workshop, Magic hosted a series of `}
        <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><b>tutorials</b></a>
        {` over three days covering some of the material which was to be presented in the hands-on part of the workshop. The `}
        <a href="https://youtu.be/pchdPBzSmT0"><b>first</b></a> 
        {` was on the MagIC data model and the uploading of data to the MagIC database, the `}
        <a href="https://youtu.be/GUjf33aNnFQ"><b>second</b></a>
        {` was on the PmagPy Demag GUI data import, analysis, and MagIC file export software, the `}
        <a href="https://www.youtube.com/watch?v=9yGPbATqRtI"><b>third</b></a>
        {` was on using PmagPy and Jupyter notebooks. These tutorial videos and others can be found on the `}
        <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><b>2020 MagIC Workshop Tutorial playlist</b></a>
        {` on the `}
        <a href="https://www.youtube.com/channel/UC-DbvhEu49a6dZXdvUWorhQ"><b>MagIC YouTube Channel</b></a>
        {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="https://github.com/earthref/MagIC-MagNetS/raw/master/MagnetZ_Logo.jpg" floated="left"/>
          {` Mag-NetZ`}
        </h3>
        <p>
          <Link to="/MagIC/MagNetZ"><b>MagNetZ (Magnetic NetworkZ)</b></Link>
          {` is a biweekly online seminar organized by `}
          <b>Greig Paterson</b>
          {` and `}
          <b>Anita Di Chiara</b>
          {`. The seminars cover topics in the geomagnetism, paleomagnetism, rock magnetism, archeomagnetism, and environmental magnetism (all things magnetic).
          Visit the `}
          <Link to="/MagIC/MagNetZ"><b>website</b></Link>
          {` for info on all the `}
          <b>speakers</b>
          {`, their `}
          <b>abstracts</b>
          {`, as well as links to the `}
          <b>YouTube</b>
          {` videos, `}
          <b>ERDA</b>
          {` entries, `}
          <b>citable DOIs</b>
          {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/sio.jpg" floated="left"/>
          {` 2021 MagIC Workshop`}
        </h3>
        <p>
          {` MagIC hosted its 2021 workshop on `}
          <b>January 19th-21st, 2021</b>
          {` online via Zoom and Slack with 194 participants. Titled "`}
          <a href="https://earthref.org/events/MAGIC/2021/"><b>2021 MagIC Workshop: Rock and Paleomagnetism through Time and Space</b></a>
          {`", it consisted of three days of science talks in four sessions. Visit the `}
          <a href="https://earthref.org/events/MAGIC/2021/"><b>workshop website</b></a>
          {` for the full schedule and other workshop details. The `} 
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKCi2xvyly82krC-_jWpelB0P"><b>workshop talks</b></a>
          {` and `} 
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKChSOapeWSKBZRbj1aGiT48r"><b>poster lightning talks</b></a>
          {` are up on our YouTube channel. The posters can be found on MagIC's Slack channel. Email Nick Jarboe (njarboe@ucsd.edu) to request an invite to the channel.`} 
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/youtube.png" floated="left"/>
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><font color="000000">2020 MagIC Workshop Tutorial Videos</font></a>
        </h3>
        <p>
        {`In lieu of the postponed 2020 MagIC Workshop, Magic hosted a series of `}
        <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><b>tutorials</b></a>
        {` over three days covering some of the material which was to be presented in the hands-on part of the workshop. The `}
        <a href="https://youtu.be/pchdPBzSmT0"><b>first</b></a> 
        {` was on the MagIC data model and the uploading of data to the MagIC database, the `}
        <a href="https://youtu.be/GUjf33aNnFQ"><b>second</b></a>
        {` was on the PmagPy Demag GUI data import, analysis, and MagIC file export software, the `}
        <a href="https://www.youtube.com/watch?v=9yGPbATqRtI"><b>third</b></a>
        {` was on using PmagPy and Jupyter notebooks. These tutorial videos and others can be found on the `}
        <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><b>2020 MagIC Workshop Tutorial playlist</b></a>
        {` on the `}
        <a href="https://www.youtube.com/channel/UC-DbvhEu49a6dZXdvUWorhQ"><b>MagIC YouTube Channel</b></a>
        {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/agu.jpg" floated="left"/>
          {` MagIC at AGU`}
        </h3>
        <p>
          {`MagIC presented an `}
          <a href="https://agu.confex.com/agu/fm19/meetingapp.cgi/Paper/548126" target="_blank"><b>eLightning talk</b></a>
          {` on Tuesday morning at 10:20 AM (`}
          <b>IN22B-01</b>
          {` - `}
          <i>Thorough Annotation of Magnetics Information Consortium (MagIC) Contributions with Schema.org Structured Metadata</i>
          {`) and a `}
          <a href="https://agu.confex.com/agu/fm19/meetingapp.cgi/Paper/560891" target="_blank"><b>poster</b></a>
          {` on Thursday afternoon (`}
          <b>GP43A-0788</b>
          {` - `}
          <i>Magnetics Information Consortium (MagIC) Database Interoperability Improvements: ORCID, EarthCube, Google, and PmagPy</i>
          {`) at the `}
          <a href="https://www.agu.org/fall-meeting" target="_blank"><b>2019 AGU Fall Meeting</b></a>
          {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src="/MagIC/ec.jpg" floated="left"/>
          {` Project 419 / GeoCODES`}
        </h3>
        <p>
          {`MagIC is working with EarthCube `}
          <a href="https://www.earthcube.org/geocodes" target="_blank"><b>GeoCODES</b></a>
          {` to publish `}
          <a href="https://json-ld.org/" target="_blank"><b>JSON-LD</b></a>
          {` contribution metadata. MagIC is providing a rich selection of HTML5 microdata `}
          <a href="https://schema.org/" target="_blank"><b>schema.org</b></a>
          {` parameters for its versioned datasets and associated references. These embedded metadata are also suitable for crawling by the `}
          <a href="https://www.epos-ip.org/" target="_blank"><b>European Plate Observing System</b></a>
          {` and `}
          <a href="https://developers.google.com/search/docs/guides/intro-structured-data" target="_blank"><b>Google Search with Structured Data</b></a>
          {`.`}
        </p>
      </div>
    );
  }

}
