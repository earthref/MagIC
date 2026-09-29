import React from 'react';
import {Container, Divider} from 'semantic-ui-react';

export default class extends React.Component {

  render() {
    return (
      <Container textAlign="justified">
        <p>
         MagIC hosts workshops, both in person and virtually. Workshops typically combine science talks spanning rock, geo-, and paleomagnetism with hands-on tutorials and working sessions on contributing data to the MagIC database and on installing, using, and contributing to the PmagPy paleomagnetic software suite. There is time for one-on-one interaction with the MagIC team, whether for help with data or to share suggestions. Details, schedules, and recordings for each workshop are listed below.<br/>
        </p>
        <Divider />
        <p>
         <h4>2027 IRM–MagIC Conference and Workshop: From Magnetic Minerals to Open Data</h4>
          The 2027 IRM–MagIC Conference and Workshop, "From Magnetic Minerals to Open Data", will take
          place from June 7th through June 10th, 2027 in Salt Lake City, Utah, hosted by the University
          of Utah. More details will be posted here as they become available.
        </p>
        <Divider />
        <p>
         <h4><a href="https://earthref.org/events/MAGIC/2023/">2023 MagIC Workshop</a> (61 Participants)</h4>
          The 2023 MagIC Workshop took place from Feb 28th through Mar 2nd, 2023 in La Jolla, California
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
