import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Icon, Form, Table, Modal, Segment, Message, Dimmer, Loader, Divider } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import owasp from 'owasp-password-strength-test';
import uuid from 'uuid';
import * as EmailValidator from 'email-validator';

import { portals } from '/lib/configs/portals';

const orcidURL = Meteor.isDevelopment ? 'sandbox.orcid.org' : 'orcid.org';
const orcidClientID = Meteor.isDevelopment ? 'APP-F8JQS3NCYGINEF7B' : 'APP-7V8YQW9CI7R01H1T';
const orcidRedirectURL = Meteor.isDevelopment ? 'http://localhost:3000/orcid' : 'https://earthref.org/orcid';
const orcidScope = '/read-limited%20/activities/update';
const orcidAuthorizeURL = `https://${orcidURL}/oauth/authorize?client_id=${orcidClientID}&response_type=code&scope=${orcidScope}&redirect_uri=${orcidRedirectURL}`;
const cookieSettings = Meteor.isDevelopment ? {} : { domain: '.earthref.org'};

owasp.config({
	allowPassphrases       : false,
	maxLength              : 128,
	minLength              : 10,
	minPhraseLength        : 20,
	minOptionalTestsToPass : 3,
});

export function User({ openInitially, className, portal }) {
	const [open, setOpen] = useState(openInitially || localStorage.getItem('user.openInitially'));
	const [user, setUser] = useState();
	const [error, setError] = useState();
	const [orcid, setORCID] = useState({ error: undefined, isUpdating: false });
	const [email, setEmail] = useState({ value: undefined, error: undefined, isUpdating: false });
	const [password, setPassword] = useState({ value: undefined, error: undefined, isUpdating: false });
	const [handle, setHandle] = useState({ value: undefined, error: undefined, isUpdating: false });
	const [givenNames, setGivenNames] = useState({ value: undefined, error: undefined, isUpdating: false });
	const [familyName, setFamilyName] = useState({ value: undefined, error: undefined, isUpdating: false });

	localStorage.setItem('user.openInitially', false);

	const id = parseInt(Cookies.get('mail_id', cookieSettings));
	const session = { id: uuid.v4() };
	if (!error && (!user || user.id !== id)) {
		Meteor.call('esGetUserByID', {id, session}, (error, user) => {
			if (error) {
				console.error(error);
				setError(error);
			} else {
				console.log(user);
				setUser(user);
			}
		});
	}

	return (
		<Modal size='small' open={open} closeIcon onClose={() => setOpen(false)}
			trigger={
				<Button className={className} onClick={() => setOpen(true)}>
					<Icon color={portals[portal].color} name='user'/>
					{ Cookies.get('name', cookieSettings) }
				</Button>
			}
		>
			<Modal.Header>
				EarthRef Account
			</Modal.Header>
			<Modal.Content>
				{ error && 
					<Message icon error>
						<Icon name='warning' />
						<Message.Content>
							<Message.Header>{ error.error }</Message.Header>
							{ error.reason }
						</Message.Content>
					</Message>
				}
				{ !error && (!user || user.id !== id) &&
					<Segment basic padded='very'>
						<Dimmer active inverted>
							<Loader inline='centered' size='large' />
						</Dimmer>
					</Segment>
				}
				{ !error && user &&
					<>
						{ user.orcid && user.orcid.id &&
							<Table definition>
								<Table.Body>
									<Table.Row>
										<Table.Cell>
											<img src='/ORCIDiD_icon64x64.png'
												style={{ height: '1.25em', margin: '-.25em .25em -.25em 0' }}
											/>
											ORCID iD
										</Table.Cell>
										<Table.Cell>
											<a href={`https://${orcidURL}/${user.orcid.id}`} target='_blank'>
												{`https://${orcidURL}/${user.orcid.id}`}
											</a>
										</Table.Cell>
									</Table.Row>
									{ user.name && user.name.source === 'ORCID'  && user.name.given && 
										<Table.Row>
											<Table.Cell><Icon name='user'/>Given Names *</Table.Cell>
											<Table.Cell>{ user.name.given || '' }</Table.Cell>
										</Table.Row>
									}
									{ user.name && user.name.source === 'ORCID' && user.name.family && 
										<Table.Row>
											<Table.Cell><Icon name='users'/>Last Name *</Table.Cell>
											<Table.Cell>{ user.name.family || '' }</Table.Cell>
										</Table.Row>
									}
									{ user.email && user.email.source === 'ORCID'  && user.email.address && 
										<Table.Row>
											<Table.Cell><Icon name='mail'/>Email *</Table.Cell>
											<Table.Cell>{ user.email.address || '' }</Table.Cell>
										</Table.Row>
									}
								</Table.Body>
								<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='2'>
										<b>* Log in to your <a href={`https://${orcidURL}/${user.orcid.id}`}>ORCID account</a> to edit these values.</b>
									</Table.HeaderCell>
								</Table.Row>
								<Table.Row>
									<Table.HeaderCell colSpan='2'>
										<Form.Button	floated='right'
											disabled={ (email.error || password.error || orcid.error || orcid.isUpdating) && true || false }
											error={orcid.error}
											onClick={() => {
												let canDisconnect = true;
												if (!user || !user.email || !user.email.address) {
													canDisconnect = false;
													setEmail(x => { 
														return {
															...x, 
															error: 'An email is required before disconnecting your account from ORCID.', 
															isUpdating: false 
														};
													});
												}
												if (!user || !user.has_password) {
													canDisconnect = false;
													setPassword(x => { 
														return {
															...x, 
															error: 'A password is required before disconnecting your account from ORCID.', 
															isUpdating: false 
														};
													});
												}
												if (canDisconnect) {
													setORCID({ error: undefined, isUpdating: true });
													Meteor.call('esDisconnectUserORCID', { id: user.id }, (error) => {
														if (error) {
															console.error(error);
															setORCID({ error: error.reason, isUpdating: false });
														} else {
															setORCID({ error: undefined, isUpdating: false });
															let updatedUser = _.cloneDeep(user);
															delete updatedUser.orcid;
															setUser(updatedUser);
														}
													});
												}
											}}
										>
											{ orcid.isUpdating && 
												<Icon loading name='spinner'/>
											}
											{ !orcid.isUpdating && 
												<img src='/ORCIDiD_icon64x64.png'
													style={{ height: '1.25em', margin: '-.25em .25em -.25em 0' }}
												/>
											}
											Disconnect Your EarthRef Account From ORCID
										</Form.Button>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
							</Table>
						}
						{ (!user.orcid || !user.orcid.id) && 
							<>
								<Button	fluid as='a' href={ orcidAuthorizeURL }>
									<img src='/ORCIDiD_icon64x64.png'
										style={{ height: '1.25em', margin: '-.25em .25em -.25em 0' }}
									/>
									Connect Your EarthRef Account to ORCID
								</Button>
								<Divider hidden />
							</>
						}
						<Form>
						{ (!user.orcid || !user.orcid.id || !user.name || user.name.source === 'EarthRef') && 
								<>
									<Form.Input
										icon='user'
										iconPosition='left'
										label='Given Names'
										placeholder='John A.'
										error={givenNames.error}
										value={givenNames.value !== undefined ? givenNames.value : user.name.given || ''}
										onChange={(e, { value }) => setGivenNames(x => { return { ...x, value }; }) }
										action={givenNames.value !== undefined && {
											content: 'Save',
											icon: givenNames.isUpdating && <Icon loading name='spinner' /> || 'save',
											color: portals[portal].color,
											disabled: givenNames.isUpdating,
											onClick: () => {
												if (givenNames.value === '') {
													setGivenNames(x => { return {...x, error: 'Given Names cannot be blank.', isUpdating: false }; });
												} else {
													setGivenNames(x => { return {...x, error: undefined, isUpdating: true }; });
													Meteor.call('esUpdateUser', { id: user.id, name: { given: givenNames.value, source: 'EarthRef' }}, (error, updatedUser) => {
														if (error) {
															console.error(error);
															setGivenNames(x => { return {...x, error: error.reason, isUpdating: false }; });
														} else {
															setGivenNames({ value: undefined, error: undefined, isUpdating: false });
															if (user.name)
																Cookies.set('name', user.name.published || `${updatedUser.name.given} ${updatedUser.name.family}`, cookieSettings);
															else
																Cookies.remove('name', cookieSettings);
															setUser(updatedUser);
														}
													});
												}
											}
										}}
									/>
									<Form.Input
										icon='users'
										iconPosition='left'
										label='Family Name'
										placeholder='Doe'
										error={familyName.error}
										value={familyName.value !== undefined ? familyName.value : user.name.family || ''}
										onChange={(e, { value }) => setFamilyName(x => { return { ...x, value }; }) }
										action={familyName.value !== undefined && {
											content: 'Save',
											icon: familyName.isUpdating && <Icon loading name='spinner' /> || 'save',
											color: portals[portal].color,
											disabled: familyName.isUpdating,
											onClick: () => {
												if (givenNames.value === '') {
													setFamilyName(x => { return {...x, error: 'Family Name cannot be blank.', isUpdating: false }; });
												} else {
													setFamilyName(x => { return {...x, error: undefined, isUpdating: true }; });
													Meteor.call('esUpdateUser', { id: user.id, name: { family: familyName.value, source: 'EarthRef' }}, (error, updatedUser) => {
														if (error) {
															console.error(error);
															setFamilyName(x => { return {...x, error: error.reason, isUpdating: false }; });
														} else {
															setFamilyName({ value: undefined, error: undefined, isUpdating: false });
															if (user.name)
																Cookies.set('name', user.name.published || `${updatedUser.name.given} ${updatedUser.name.family}`, cookieSettings);
															else
																Cookies.remove('name', cookieSettings);
															setUser(updatedUser);
														}
													});
												}
											}
										}}
									/>
								</>
							}
							{ (!user.orcid || !user.orcid.id || !user.email || !user.email.address || user.email.source === 'EarthRef') && 
								<Form.Input
									icon='mail'
									iconPosition='left'
									label='Email'
									placeholder='Preferred Email Address'
									error={
										email.error || 
										(user.orcid && user.orcid.id && (!user.email || !user.email.address) && 'The email cannot be blank. Please either set your email to be shared with "trusted parties" (EarthRef.org is an ORCID Member Organization) by clicking on your ORCID iD above or enter your email here.') ||
										((!user.email || !user.email.address) && 'The email cannot be blank. Please enter your email here so we can identify you as unique user.')
									}
									value={email.value !== undefined ? email.value : user.email.address || ''}
									onChange={(e, { value }) => setEmail(x => { return { ...x, value }; }) }
									action={email.value !== undefined && {
										content: 'Save',
										icon: email.isUpdating && <Icon loading name='spinner' /> || 'save',
										color: portals[portal].color,
										disabled: email.isUpdating,
										onClick: () => {
											if (email.value === '') {
												setEmail(x => { return {...x, error: 'The email cannot be blank.', isUpdating: false }; });
											} if (!EmailValidator.validate(email.value)) {
												setEmail(x => { return {...x, error: 'The email is invalid.', isUpdating: false }; });
											} else {
												setEmail(x => { return {...x, error: undefined, isUpdating: true }; });
												Meteor.call('esUpdateUser', { id: user.id, email: { address: email.value, source: 'EarthRef' }}, (error, updatedUser) => {
													if (error) {
														console.error(error);
														setEmail(x => { return {...x, error: error.reason, isUpdating: false }; });
													} else {
														setEmail({ value: undefined, error: undefined, isUpdating: false });
														console.log('updatedUser', updatedUser);
														setUser(updatedUser);
													}
												});
											}
										}
									}}
								/>
							}
							<Form.Input
								icon='at'
								iconPosition='left'
								label='Handle'
								placeholder='Username for Display'
								error={handle.error}
								value={handle.value !== undefined ? handle.value :  user.handle || ''}
								onChange={(e, { value }) => setHandle(x => { return { ...x, value }; }) }
								action={handle.value !== undefined && {
									content: 'Save',
									icon: handle.isUpdating && <Icon loading name='spinner' /> || 'save',
									color: portals[portal].color,
									disabled: handle.isUpdating,
									onClick: () => {
										if (handle.value === '') {
											setHandle(x => { return {...x, error: 'The handle cannot be blank.', isUpdating: false }; });
										} else {
											setHandle(x => { return {...x, error: undefined, isUpdating: true }; });
											Meteor.call('esGetUserByHandle', { handle: handle.value }, (error, existingUser) => {
												if (!error && existingUser) {
													console.error('existingUser', existingUser);
													setHandle(x => { return {...x, error: 'The handle already exists.', isUpdating: false }; });
												} else {
													Meteor.call('esUpdateUser', { id: user.id, handle: handle.value }, (error, updatedUser) => {
														if (error) {
															console.error(error);
															setHandle(x => { return {...x, error: error.reason, isUpdating: false }; });
														} else {
															setHandle({ value: undefined, error: undefined, isUpdating: false });
															Cookies.set('user_id', `${updatedUser.handle}`, cookieSettings);
															setUser(updatedUser);
														}
													});
												}
											});
										}
									}
								}}
							/>
							<Form.Input
								icon='key'
								iconPosition='left'
								label='Password'
								type='password'
								error={password.error}
								value={password.value !== undefined ? password.value : ''}
								placeholder={user.has_password && '********' || 'Create a Password'}
								onChange={(e, { value }) => setPassword(x => { return { ...x, value }; }) }
								action={password.value !== undefined && {
									content: 'Save',
									icon: password.isUpdating && <Icon loading name='spinner' /> || 'save',
									color: portals[portal].color,
									disabled: password.isUpdating,
									onClick: () => {
										const passwordTest = owasp.test(password.value);
										if (passwordTest.errors.length) {
											setPassword(x => { return {...x, error: passwordTest.errors.join(' '), isUpdating: false }; });
										} else {
											setPassword(x => { return {...x, error: undefined, isUpdating: true }; });
											Meteor.call('esUpdateUser', { id: user.id, password: password.value }, (error, updatedUser) => {
												if (error) {
													console.error(error);
													setPassword(x => { return {...x, error: error.reason, isUpdating: false }; });
												} else {
													setPassword({ value: undefined, error: undefined, isUpdating: false });
													setUser(updatedUser);
												}
											});
										}
									}
								}}
							/>
						</Form>
					</>
				}
			</Modal.Content>
			{ error &&
				<Modal.Actions>
					<Button 
						basic
						negative
						as='a'
						href={'mailto:webmaster@earthref.org?subject=[EarthRef Log In Help]%20I%27m%20having%20trouble%20logging%20in%20with%20ORCID'} 
						style={{ float: 'left' }}
					>
						<Icon name='mail'/>
						&nbsp;<b>Having Trouble?</b>&nbsp;Email Us
					</Button>
						<Button
							onClick={() => { setUser(undefined); setError(undefined); }}
						>
							Retry Fetching User Data
						</Button>
				</Modal.Actions>
			}
		</Modal>
	);
}