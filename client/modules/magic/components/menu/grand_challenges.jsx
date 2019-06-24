import React from 'react';
import {Grid} from 'semantic-ui-react';

export default class extends React.Component {

	render() {
		return (
			<div>
				<Grid verticalAlign="middle">
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/glatzmaierReversal.jpg"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
							<b>The Geomagnetic and Thermal History of the Earth:</b> Paleomagnetic studies provide a unique means of viewing Earth’s temporal evolution and thermal history. Very ancient paleomagnetic records combined with studies of Earth’s deep interior may give rare information about the timing of formation and growth of the inner core, throwing light on the energy budget for the geodynamo and also confirming persistent dipolar structure in the early magnetic field. Other challenging problems include the assembly and interpretation of diverse paleomagnetic data to describe the full spectrum of geomagnetic field behavior, including geomagnetic reversals and how they are initiated. Interpretation of this behavior will require understanding both laboratory paleomagnetic data and synthesizing insights obtained from numerical geodynamo simulations  and mineral physics via links to entities like the CIG geodynamo working group and the CSEDI program for Cooperative Studies of Earth’s Deep Interior.
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/polarWanderPlumes.jpg"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
						<b>True Polar Wander and Plumes:</b> A longstanding geodynamical question is whether significant true polar wander has occurred in the geological past. Have current mantle plumes stayed fixed in the mantle, do they blow in the mantle wind or does the entire mantle move over short time scales with respect the spin axis? Paleomagnetic results and tests of their consistency with the geocentric axial dipole hypothesis combined with detailed geological knowledge and accurate age dating carry the clues to distinguishing one from the other.
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/widemereLakeCore.png"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
					<b>Understanding Interactions Between Magnetic Field and Climate:</b> Magnetic properties and geochemical properties measured in marine and lake sediment cores carry a record of regional environmental change. Rock magnetic studies thus can be used as a proxy for climate change, although it remains a challenge to understand relations to physical parameters, such as grain size or geochemistry. Nevertheless, increasingly detailed analyses provide a rich resource for regional and global data mining and we expect substantial advances in this area over the next decade as it becomes possible to link and compare disparate data sources. More controversially, there are suggestions that changes in the geomagnetic field itself may be linked with climate changes, although even the direction of any cause-and-effect relation is debated. For this grand challenge, progress requires database linkages to high-quality age controls and creative interdisciplinary work to understand the physical causes of any links between magnetic field and climate.
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/pigeon.jpg"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
						<b>Biogeomagnetism:</b> Many organisms are sensitive to the Earth’s geomagnetic field and employ it (in combination with other environmental cues) for a variety purposes, some of which are related to their orientation and navigation. Understanding the basis for magnetoreception in life forms, ranging from mammals to micro-organisms, is a burgeoning interdisciplinary field (see for example the special section of J. Roy. Soc. Interface
							(<a href="https://doi.org/10.1098/rsif.2010.0010.focus">doi:10.1098/rsif.2010.0010.focus</a>)
							involving behavioral biology, biological physics, neuroscience, geophysics, and rock magnetism. While magnetofossils are known to be important contributors to records of the ancient geomagnetic field, we still have only a poor understanding of how various life forms accommodate large scale changes in its strength and direction. Researchers studying magnetotactic bacteria are already developing a database for information related to their gene sequencing, PCR analyses and basic rock magnetic properties
							(<a href="http://database.biomnsl.com/index.html">http://database.biomnsl.com/index.html</a>)
							and we believe it would be important to start to link this information to more detailed experimental results from related rock magnetic studies, and provide a home for more extensive biomagnetic experimental results.
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/loessVicksburg.jpg"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
						<b>Environmental Magnetism, Dust and Rainfall:</b> Rock and mineral magnetic techniques can be used to study the formation, transportation, deposition and post-depositional alteration of magnetic minerals as they respond to changes in environmental conditions. Environmental magnetism has contributed to research in Earth science and has found applications in physics, chemistry and biological sciences including research on pollution, climate change, and iron biomineralization (see comprehensive review by Liu et al. 2012). While magnetic properties are quick to measure, deciphering the environmental implications remains a challenge requiring a detailed understanding of a range of complex measurements. The MagIC database has been designed to accommodate the wide range and enormous volume of measurements generated in a typical environmental magnetism study.
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
						<div className="ui small rounded image">
							<img src="/MagIC/seymchanMeteorite.jpg"/>
						</div>
						</Grid.Column>
						<Grid.Column width={13} textAlign='justified'>
						<b>Magnetism at High Pressures and in Extraterrestrial Bodies:</b> Magnetic fields associated with extraterrestrial bodies and meteorites can provide important information about their temporal evolution and thermal history. However, studies of lunar samples and meteorites have posed special challenges in paleomagnetism related to their very unusual magnetic mineralogies, issues of representative temporal and spatial sampling, and environmental stresses on samples in transit through space and on entering Earth’s atmosphere. Other questions of importance are the effects of shock on remanent magnetization and its role in demagnetizing regions of planets subject to severe impacts by meteorites, especially Mars and the Moon. MagIC has already accommodated conventional lunar paleointensity results
							(<a href="https://doi.org/10.1016/j.pepi.2008.05.007">Lawrence et al. 2008</a>)
							and this database can readily deal with paleointensity experiments using SQUID microscopy or less conventional experimental techniques. New studies are also exploring the effects of high pressures, shocks and impact craters on Earth and magnetic fields associated with the early Solar System, and will provide interesting data on comparatively exotic magnetic mineralogies and physical states.
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}

}