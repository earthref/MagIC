import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Message} from 'semantic-ui-react';

import {portals} from '/lib/configs/portals.js';
import assetUrl from '/client/lib/asset_url';

export default class extends React.Component {

  render() {
    return (
      <div style={{textAlign: "justify"}}>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src={assetUrl('/MagIC/pmag_org_logo.png')} floated="left"/>
          {`Paleomagnetism.org file converter`}
        </h3>
        <p>
          {`To facilitate direction paleomagnetic data sharing between laboratories, Paleomagnetism.org has developed a `} 
          <a href="https://beta.paleomagnetism.org/converter"><b>File Format Converter</b></a>
          {`. Visit the beta site and try it out. Please send comments, problem reports, or requests for additional formats to paleomagnetism.org@gmail.com`}
        </p>
        <h3>
          <Image size="mini" src={assetUrl('/MagIC/agu.jpg')} floated="left"/>
          {`MagIC at AGU`}
        </h3>
        <p>
          {` MagIC presented a poster at last year's AGU conference in the Monday afternoon poster session `}
          <b>(GP13B-0307)</b>
          {`. A copy of the 2025 poster can be found `}
          <a href="https://njarboe.com/public/JarboeMagIC2025AGUPoster.pdf"><b>here</b></a>
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
          <Image size="mini" src={assetUrl('/MagIC/sio.jpg')} floated="left"/>
          {` 2023 MagIC Workshop`}
        </h3>
        <p>
          {` MagIC hosted its 2023 workshop on `}
          <b>February 28th - March 2nd, 2023</b>
          {` at the Scripps Institution of Oceanography, UCSD in La Jolla, California with 61 participants. Titled "`}
          <a href="https://earthref.org/events/MAGIC/2023/"><b>Magnetism and Earth History: Field Evolution, Environmental Change and Paleogeography</b></a>
          {`", it consisted of two days of science talks in four sessions and a day of MagIC-related group working sessions. Visit the `}
          <a href="https://earthref.org/events/MAGIC/2023/"><b>workshop website</b></a>
          {` for the full schedule and other workshop details. The `}
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgfd7YuZ_li9V3yMsB5-_bG"><b>workshop talks</b></a>
          {` are up on our `}
          <a href="https://www.youtube.com/@magneticsinformationconsor5873"><b>YouTube channel</b></a>
          {`.`}
        </p>
        <div className="ui divider"></div>
        <h3>
          <Image size="mini" src={assetUrl('/MagIC/youtube.png')} floated="left"/>
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
        <h3>
          <Image size="mini" src={assetUrl('/MagIC/ec.jpg')} floated="left"/>
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
