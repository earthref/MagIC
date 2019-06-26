import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Label, Segment, Container, Header, Divider } from 'semantic-ui-react';

const labelStyle = { textAlign:'center', textOverflow:'ellipsis', overflow:'hidden' };

export default class extends React.Component {

	render() {
		return (
			<div>
				<Container fluid textAlign='justified'>
					The introduction of the <a href='https://earthref.org/MagIC/data-models/3.0' target='_blank'>MagIC Data Model 3.0</a> reduces the time needed to understand its structure and simplifies the process of using it to contribute data to MagIC. 
					The number of tables has decreased from 31 to 9 and is now organized in 6 hierarchical levels from the raw measurements up to the publication metadata. 
					This data model, along with method codes and vocabulary lists, can be browsed via the MagIC website, downloaded as JSON files for reuse, and easily updated by the MagIC team by request from the community via either email or reporting an issue at the MagIC GitHub repository.
				</Container>
				<Divider hidden/>
				<Image style={{ maxWidth:800, margin:'auto' }} src="/MagIC/technology/ecosystem.png" fluid/>
				<Divider hidden/>
				<Container fluid textAlign='justified'>
					<Header size='medium' dividing>Technologies and Surrounding Ecosystem</Header>
					MagIC has completed the transition from an Oracle backed, Perl based, server-oriented website to an Elasticsearch and MongoDB backed, Meteor and React based, thick client website technology stack. 
					This thick client system has enabled the creation of a more responsive interface including uploading templates with column name suggestions and table/column exclusion toggles. Active data validation and online spreadsheet editing are additional features being developed using these new technologies. 
					Uploading data into the archive with comprehensive indexing and completing complicated search queries to obtain unique datasets are an order of magnitude quicker than the old system. 
					Searches return row level data over all contributions and the user can choose to download the rows meeting the search criteria from only a subset of tables, if desired. The selected data are available for download as either a single text file of various formats or an Excel spreadsheet.
					The MagIC Website Application is deployed to Docker containers that are orchestrated with Kubernetes and integrate with Amazon Web Services.
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
					For effective inclusion in online data aggregators and search engines, an XML sitemap has been added to the website and contributions are served with schema.org and JSON-LD compliant data descriptions for indexing by Google Search, EarthCube’s Project 418/419, the European Plate Observing System, and any other entities that wish to query MagIC. 
					
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
									<Image src='/MagIC/technology/EZID.png'/>
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

