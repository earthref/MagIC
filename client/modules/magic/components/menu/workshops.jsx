import React from 'react';
import {Container, Divider} from 'semantic-ui-react';

export default class extends React.Component {

  render() {
    return (
      <Container textAlign="justified">
        <p>
         MagIC has hosted workshops in 2011, 2014 and 2017 at the Scripps Institution of Oceanography in La Jolla, California. The format is generally two days of science talks followed by a few days of hands-on tutorials. During the tutorials we give presentations about uploading data into the MagIC database and installing, using, and contributing to the PmagPy paleomagnetic software suite. There is plenty of time given to one-on-one interaction with the MagIC team for help or to give us suggestions. In 2020 the MagIC in-person workshop was postponed due the SARS-CoV-2 virus outbreak and was replaced by a shortened virtual meeting.<br/>
        </p>
        <Divider />
        <p>
         <h4><a href="https://earthref.org/events/MAGIC/2023/">2023 MagIC Workshop</a> (61 Participants)</h4>
          The 2023 MagIC Workshop was took place from Feb 28th through Mar 2nd, 2023 in La Jolla, California
          at the Scripps Institution of Oceanography, UCSD. The workshop, "Magnetism and Earth History: Field
          Evolution, Environmental Change and Paleogeography", consisted of two days of science talks in four
          sessions and a day of MagIC-related group working sessions. Please visit the workshop
          <a href="https://earthref.org/events/MAGIC/2023/">website</a> for the full schedule and other workshop details.
        </p>
        <Divider />
        <p>
         <h4><a href="https://earthref.org/events/MAGIC/2021/">2021 MagIC Workshop</a> (194 Virtual Participants)</h4>
          The 2021 MagIC Workshop was held virtually from Jan 19th through Jan 21st, 2021.
          It consisted of four live scientific sessions covering a range of topics in rock, geo,
          and paleomagnetism. We also have a presentation of MagIC's progress and future plans.
          To accommodate participants of various time zones, we scheduled one 
          session in the evening (PST). Please visit the 
          workshop <a href="https://earthref.org/events/MAGIC/2021/"><b>website</b></a> for the talk schedule and 
          other information.
        </p>
        <Divider />
        <p>
         <h4>2020 MagIC Workshop</h4>
          The 2020 MagIC workshop was to take place March 16th-18th, 2020 in La Jolla, California
          at the Scripps Institution of Oceanography. Due to the SARS-CoV-2 virus outbreak the
          in-person workshop has been postponed into 2021. Instead, a virtual meeting was held with
          one speaker each day giving a talk about MagIC technology and tools. Those talks were
          recorded and can be viewed on the MagIC YouTube channel:
          <a href="https://www.youtube.com/playlist?list=PLirL2unikKCgUkHQ3m8nT29tMCJNBj4kj"><b>
            2020 MagIC Workshop Tutorials</b></a>.
        </p>
        <Divider />
        <p>
         <h4><a href="https://earthref.org/events/MAGIC/2017/">2017 MagIC Workshop</a> (62 Participants)</h4>
         For a detailed description and schedule of the 2017 workshop, you can visit
         its <a href='https://earthref.org/events/MAGIC/2017/'><b>homepage</b></a>.<br/>
         Videos of many of the talks can be found on our <a href='https://www.youtube.com/channel/UC-DbvhEu49a6dZXdvUWorhQ'><b>YouTube channel</b></a>.
        </p>
        <Divider />
      </Container>
    );
  }
}
