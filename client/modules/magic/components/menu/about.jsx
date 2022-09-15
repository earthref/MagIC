import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Image, Container, Segment, Header, Divider} from 'semantic-ui-react';

import IconButton from '/client/modules/common/components/icon_button';

export default class extends React.Component {

	render() {
		return (
			<div>
				<Container fluid textAlign='justified'>
					The Magnetics Information Consortium (MagIC) improves research capacity in the Earth and Ocean sciences by maintaining an open community digital data repository for rock and paleomagnetic data with portals that allow users to archive, search, visualize, download, and combine these versioned datasets.
					MagIC supports the international rock and paleomagnetic communities and endeavors to bring data out of private archives, making them accessible to all and (re-)useable for new, creative, collaborative scientific and educational activities. 
					
				</Container>
				<Divider hidden/>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>MagIC Support</Header>
					Funded by <a href='https://www.nsf.gov/awardsearch/simpleSearchResult?queryText=%22Magnetics+Information+Consortium%22' target='_blank'>NSF since 2003</a>, MagIC forms a major part of <a href='https://earthref.org' target='_blank'>EarthRef.org</a>, which integrates four independent cyber-initiatives rooted in various parts of the Earth, Ocean and Life sciences and education. MagIC is a collaborative effort between the College of Earth, Ocean and Atmospheric Science, Oregon State University and the Scripps Institution of Oceanography, UC San Diego.
					<Grid padded columns={7}>
						<Grid.Row>
							<Grid.Column>
							</Grid.Column>
							<Grid.Column>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Image src='/MagIC/technology/nsf_small.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Image src='/MagIC/technology/osu_small.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Image src='/MagIC/technology/ucsd_small.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
							</Grid.Column>
							<Grid.Column>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Divider hidden/>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>MagIC Core Group</Header>
					MagIC is inherently domain-specific and directed by PIs who are both producers and consumers of rock and paleomagnetic data.
					<Grid padded columns={6}>
						<Grid.Row>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#akoppers">
								<div className="ui huge icon bordered rounded image" data-tooltip="Marine Geology and Geophysics, CEOAS, OSU" >
									<img src="/MagIC/people/akoppers.jpg" />
								</div><br/>
								Anthony Koppers
								<div className="sub header">Associate Dean at<br/>CEOAS, OSU</div>
							</a>
							</Grid.Column>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#nswanson-hysell">
								<div className="ui huge icon bordered rounded image" data-tooltip="Earth and Planetary Science, Berkeley" >
									<img src="/MagIC/people/nswanson-hysell.jpg" />
								</div><br/>
								Nick Swanson-Hysell
								<div className="sub header">Associate Professor at<br/>EPS, Berkeley</div>
							</a>
							</Grid.Column>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#cconstable">
								<div className="ui huge icon bordered rounded image" data-tooltip="Institute for Geophysics and Planetary Physics, SIO, UCSD" >
									<img src="/MagIC/people/cconstable.jpg" />
								</div><br/>
								Cathy Constable
								<div className="sub header">Professor at<br/>SIO, UCSD</div>
							</a>
							</Grid.Column>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#ltauxe">
								<div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
									<img src="/MagIC/people/ltauxe.jpg" />
								</div><br/>
								Lisa Tauxe
								<div className="sub header">Distinguished Professor<br/>at SIO, UCSD</div>
							</a>
							</Grid.Column>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#njarboe">
								<div className="ui huge icon bordered rounded image" data-tooltip="Geosciences Research Division, SIO, UCSD" >
									<img src="/MagIC/people/njarboe.jpg" />
								</div><br/>
								Nick Jarboe
								<div className="sub header">Data Analyst via<br/>CEOAS, OSU</div>
							</a>
							</Grid.Column>
							<Grid.Column>
								<a className="ui center aligned small icon header" target="_top" href="/MagIC/contact/#rminnet">
								<div className="ui huge icon bordered rounded image" data-tooltip="Marine Geology and Geophysics, CEOAS, OSU" >
									<img src="/MagIC/people/rminnett.jpg" />
								</div><br/>
								Rupert Minnett
								<div className="sub header">Programmer via<br/>CEOAS, OSU</div>
							</a>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>PmagPy Open-Source Software Contributors</Header>
					<ul>
						<li><a href="http://earthref.org/erml/629">Lisa Tauxe</a></li>
						<li><a href="http://earthref.org/erml/7441">Nick Swanson-Hysell</a></li>
						<li><a href="http://earthref.org/erml/8110">Lori Jonestrask</a></li>
						<li><a href="http://earthref.org/erml/8260">Kevin Gaastra</a></li>
						<li><a href="http://earthref.org/erml/6899">Ron Shaar</a></li>
						<li><a href="http://earthref.org/erml/6434">Nick Jarboe</a></li>
						<li><a href="http://earthref.org/erml/5730">Rupert Minnett</a></li>
						<li><a href="http://earthref.org/erml/8184">Luke Fairchild</a></li>
					</ul>
				</Container>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>MagIC Info</Header>
					<ul>
						<li>MagIC's Research Organization Registry (ROR) id: <a href="https://ror.org/00f89wy98">https://ror.org/00f89wy98</a></li>
						<li>MagIC at re3data.org: : <a href="https://www.re3data.org/repository/r3d100011910">https://www.re3data.org/repository/r3d100011910</a></li>
					</ul>
				</Container>
			</div>
		);
	}

}

