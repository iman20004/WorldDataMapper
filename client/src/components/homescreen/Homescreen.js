import Logo from '../navbar/Logo';
import Path from '../navbar/Path';
import Login from '../modals/Login';
import UpdateAccount from '../modals/UpdateAccount';
import CreateAccount from '../modals/CreateAccount';
import DeleteMapModal from '../modals/DeleteMapModal';
import MapName from '../modals/MapName';
import MapEdit from '../modals/MapEdit';
import Maps from '../map/Maps';
import Region from '../region/Region';
import RegionViewer from '../region/RegionViewer';
import Welcome from '../Welcome';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
import { GET_DB_REGIONS } from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WLMain } from 'wt-frontend';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const Homescreen = (props) => {

	const auth = props.user === null ? false : true;
	let regions = [];
	let maps = [];

	const [activeRegion, setActiveRegion] = useState({});
	const [route, setRoute] = useState(['']);

	//const [activeMap, setActiveMap] = useState({});
	const [activeViewer, toggleActiveViewer] = useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showDeleteMap, toggleShowDeleteMap] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [showMapName, toggleShowMapName] = useState(false);
	const [showMapEdit, toggleShowMapEdit] = useState(false);
	const [deleteMapId, setDeleteMap] = useState('');
	const [editMapId, setEditMap] = useState('');
	//const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	//const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign maps 
		for (let region of data.getAllRegions) {
			regions.push(region)
		}
		maps = regions.filter(region => region.root === true);
	}

	// NOTE: might not need to be async
	const reload = async () => {
		if (activeRegion._id) {
			let tempID = activeRegion._id;
			let reg = regions.find(reg => reg._id === tempID);
			setActiveRegion(reg);
			//refetch();
		}
	}

	const loadMap = (map) => {
		//props.tps.clearAllTransactions();
		//setCanUndo(props.tps.hasTransactionToUndo());
		//setCanRedo(props.tps.hasTransactionToRedo());
		//setActiveRegion(map);

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }],
		awaitRefetchQueries: true,
		onCompleted: () => reload()
	}

	const handleSetRoute = (arr) => {
		setRoute(arr);
	}

	const handleSetActiveViewer = (bool) => {
		toggleActiveViewer(bool);
	}

	const [AddRegion] = useMutation(mutations.ADD_REGION);
	const [DeleteRegion] = useMutation(mutations.DELETE_REGION);
	const [UpdateRegion] = useMutation(mutations.UPDATE_REGION, mutationOptions);

	const createNewMap = async (mapname) => {
		let newMap = {
			_id: '',
			owner: props.user._id,
			name: mapname,
			capital: '',
			leader: '',
			landmarks: [],
			root: true,
			parentId: '',
			childrenIds: []
		}
		const { data } = await AddRegion({ variables: { region: newMap }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			reload();
		}
	};

	const createNewRegion = async (_id) => {
		let newRegion = {
			_id: '',
			owner: props.user._id,
			name: 'Untitled',
			capital: 'Capital',
			leader: 'Leader',
			landmarks: ['None'],
			root: false,
			parentId: _id,
			childrenIds: []
		}
		const { data } = await AddRegion({ variables: { region: newRegion }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			reload();
		}
	};

	const handleDeleteMap = async (_id) => {
		DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		//loadMap({});
	};

	const editMap = async (_id, newName) => {
		const { data } = await UpdateRegion({ variables: { _id: _id, value: newName } });
	}

	const handleSetActiveRegion = (reg) => {
		setActiveRegion(reg);
	};

	/*
	const handleSetActiveMap = (map) => {
		setActiveMap(map);
	};*/

	const setShowLogin = () => {
		toggleShowDeleteMap(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	};

	const setShowDeleteMap = (_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		setDeleteMap(_id);
		toggleShowDeleteMap(!showDeleteMap);
	};

	const setShowMapName = () => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowMapName(!showMapName);
	};

	const setShowMapEdit = (_id) => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowMapName(false);
		setEditMap(_id);
		toggleShowMapEdit(!showMapEdit);
	};

	return (
		<BrowserRouter>
			<WLayout wLayout="header">
				<WLHeader>
					<WNavbar color="colored">
						<ul>
							<WNavItem>
								<Logo className='logo'
									auth={auth}
									setRoute={handleSetRoute}
									activeViewer={handleSetActiveViewer}
								//handleSetActiveMap={handleSetActiveMap}
								//handleSetActiveRegion={handleSetActiveRegion}
								/>
							</WNavItem>
						</ul>
						<ul>
							<WNavItem>
								{
									(activeViewer) ?
										<div className="arrows">
											<i className="material-icons large">arrow_back</i>
											<div className='info-spacer'></div>
											<i className="material-icons large">arrow_forward</i>
										</div>
										: (route.length > 1) ?
											<Path className='logo'
												route={route}
											/>
											: <div></div>
								}
							</WNavItem>
						</ul>
						<ul>
							<NavbarOptions
								fetchUser={props.fetchUser} auth={auth}
								setShowCreate={setShowCreate} setShowLogin={setShowLogin}
								username={props.user === null ? '' : props.user.firstName}
								setShowUpdate={setShowUpdate}
								setRoute={handleSetRoute}
								activeViewer={handleSetActiveViewer}
							//setActiveRegion={loadMap}
							//handleSetActiveMap={handleSetActiveMap}
							/>
						</ul>
					</WNavbar>
				</WLHeader>

				<WLMain>
					{
						!auth ?
							<Redirect exact from="/home" to={{ pathname: "/home/welcome" }} />
							:
							<Redirect exact from="/home" to={{ pathname: "/home/maps" }} />
					}

					<Switch>
						<Route path="/home/welcome">
							<div className="container-secondary">
								<Welcome />
							</div>
						</Route>

						<Route path="/home/maps" >
							<div className="container-secondary">
								<Maps
									maps={maps}
									setShowMapName={setShowMapName}
									setShowDeleteMap={setShowDeleteMap}
									setShowMapEdit={setShowMapEdit}
									setRoute={handleSetRoute}
								//handleSetActiveRegion={handleSetActiveRegion}
								//handleSetActiveMap={handleSetActiveMap}
								/>
							</div>
						</Route>

						<Route path="/home/region/:id">
							<div className="container-secondary1">
								<Region
									regions={regions}
									createNewRegion={createNewRegion}
									setRoute={handleSetRoute}
									route={route}
									activeViewer={handleSetActiveViewer}
								//activeRegion={activeRegion}
								//subRegions={childs}
								//handleSetActiveRegion={handleSetActiveRegion}
								/>
							</div>
						</Route>

						<Route path="/home/regionviewer/:id">
							<div className="container-secondary">
								<RegionViewer
									regions={regions}
									activeViewer={handleSetActiveViewer}
								//activeRegion={activeRegion}
								//handleSetActiveRegion={handleSetActiveRegion}
								/>
							</div>
						</Route>
					</Switch>

				</WLMain>

				{
					showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
				}

				{
					showLogin && (<Login fetchUser={props.fetchUser} reload={refetch} setShowLogin={setShowLogin} />)
				}

				{
					showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} user={props.user} />)
				}

				{
					showMapName && (<MapName createNewMap={createNewMap} setShowMapName={setShowMapName} />)
				}

				{
					showMapEdit && (<MapEdit editMap={editMap} setShowMapEdit={setShowMapEdit} editMapId={editMapId} />)
				}

				{
					showDeleteMap && (<DeleteMapModal deleteMap={handleDeleteMap} setShowDeleteMap={setShowDeleteMap} deleteMapId={deleteMapId} />)
				}


			</WLayout>

		</BrowserRouter>
	);
};

export default Homescreen;
