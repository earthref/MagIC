import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Label, Segment, Container, Header, Divider } from 'semantic-ui-react';

const labelStyle = { textAlign:'center', textOverflow:'ellipsis', overflow:'hidden' };

export default class extends React.Component {

	render() {
		return (
			<div>
				<Container fluid textAlign='justified'>
					The Magnetics Information Consortium (MagIC) improves research capacity in the Earth and Ocean sciences by maintaining an open community digital data archive for rock and paleomagnetic data with portals that allow users access to archive, search, visualize, and download these data. 
					MagIC supports the international rock and paleomagnetic communities and endeavors to bring data out of private archives, making them accessible to all and (re-)useable for new, creative, collaborative scientific and educational activities. 
					It is inherently domain-specific and directed by PIs who are both producers and consumers of rock and paleomagnetic data. 
					Funded by NSF since 2003, MagIC forms a major part of <a href='https://earthref.org'>EarthRef.org</a> which integrates four independent cyber-initiatives rooted in various parts of the Earth, Ocean and Life sciences and education.
				</Container>
				<Divider hidden/>
				<Image style={{ maxWidth:800, margin:'auto' }} src="/MagIC/technology/ecosystem.png" fluid/>
				<Divider hidden/>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>Technologies and Surrounding Ecosystem</Header>
					MagIC has completed the transition from an Oracle backed, Perl based, server-oriented website to an Elasticsearch backed, Meteor based thick client website technology stack. 
					This thick client system has enabled the creation of a sophisticated, app-like interface for uploading with active elements like column header suggestions, table rejection toggle switches, and "don't import this column" switches. 
					On-the-fly data validation and online spreadsheet editing are some additional features that will be possible by using these software technologies. 
					Uploading data into the archive with comprehensive indexing and completing complicated search queries to obtain unique datasets are an order of magnitude quicker than the old system. 
					Searches return row level data over all contributions and the user can choose to download the rows meeting the search criteria from only a subset of tables, if desired. The selected data is available to be downloaded as either single text file of various formats or an Excel spreadsheet. 
					<Grid padded columns={8}>
						<Grid.Row>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>React</Label>
									<Image src='/MagIC/technology/react.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Semantic UI</Label>
									<Image src='/MagIC/technology/semantic-ui.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Meteor</Label>
									<Image src='/MagIC/technology/meteor.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>MongoDB</Label>
									<Image src='/MagIC/technology/mongodb.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Elasticsearch</Label>
									<Image src='/MagIC/technology/elasticsearch.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>AWS</Label>
									<Image src='/MagIC/technology/aws.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
										<Label attached='bottom' style={labelStyle}>Docker</Label>
										<Image src='/MagIC/technology/docker.svg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Kubernetes</Label>
									<Image src='/MagIC/technology/kubernetes.svg'/>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Divider hidden/>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>Integrations and Discovery</Header>
					For effective inclusion in online data aggregators and search engines, an XML sitemap has been added to the website and contributions are served with schema.org and JSON-LD compliant data descriptions for indexing by Google Search, EarthCube’s Project 418, the European Plate Observing System, and any other entities that wish to query MagIC. 
					The introduction of the MagIC Data Model 3.0 reduces the time needed to understand its structure and simplifies the process of using it to contribute data to MagIC. 
					The number of tables has decreased from 31 to 9 and is now organized in 6 hierarchical levels from the raw measurements up to the publication metadata. 
					This data model, along with method codes and vocabulary lists, can be browsed via the MagIC website, downloaded as JSON files for reuse, and can be easily updated by the MagIC team by request from the community via either email or reporting an issue at the MagIC GitHub repository.
					<Grid padded columns={6}>
						<Grid.Row>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Reference Metadata</Label>
									<Image src='/MagIC/technology/crossref.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>DOI Minting</Label>
									<Image src='/MagIC/technology/EZID.jpg'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Structured Data</Label>
									<Image src='/MagIC/technology/json-ld.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Nature Repository</Label>
									<Image src='/MagIC/technology/scientific data.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>Data DOI Metadata</Label>
									<Image src='/MagIC/technology/datacite.png'/>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Label attached='bottom' style={labelStyle}>ORCiD Member</Label>
									<Image src='/MagIC/technology/orcid.png'/>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		);
	}

}

