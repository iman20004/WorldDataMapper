import Logo from '../navbar/Logo';
import Login from '../modals/Login';
import UpdateAccount from '../modals/UpdateAccount';
import CreateAccount from '../modals/CreateAccount';
import DeleteMapModal from '../modals/DeleteMapModal';
import MapName from '../modals/MapName';
import MapEdit from '../modals/MapEdit';
import Maps from '../map/Maps';
import Welcome from '../Welcome';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
import { GET_DB_MAPS } from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WLMain } from 'wt-frontend';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const Homescreen = (props) => {

	const auth = props.user === null ? false : true;
	let maps = [];
	const [activeMap, setActiveMap] = useState({});
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

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign maps 
		for (let map of data.getAllMaps) {
			maps.push(map)
		}
		// if a list is selected, shift it to front of maps
		if (activeMap._id) {
			let selectedMapIndex = maps.findIndex(entry => entry._id === activeMap._id);
			let removed = maps.splice(selectedMapIndex, 1);
			maps.unshift(removed[0]);
		}
	}



	// NOTE: might not need to be async
	const reloadMap = () => {
		if (activeMap._id) {
			let tempID = activeMap._id;
			let map = maps.find(map => map._id === tempID);
			setActiveMap(map);
		}
	}

	const loadMap = (map) => {
		props.tps.clearAllTransactions();
		//setCanUndo(props.tps.hasTransactionToUndo());
		//setCanRedo(props.tps.hasTransactionToRedo());
		//setActiveMap(map);

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }],
		awaitRefetchQueries: true,
		onCompleted: () => reloadMap()
	}

	const [AddRegion] = useMutation(mutations.ADD_REGION, mutationOptions);
	const [AddMap] = useMutation(mutations.ADD_MAP);
	const [DeleteMap] = useMutation(mutations.DELETE_MAP);
	const [UpdateMap] = useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);

	const createNewMap = async (mapname) => {
		let newMap = {
			_id: '',
			name: mapname,
			owner: props.user._id,
			regions: []
		}
		const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_MAPS }] });
		if (data) {
			loadMap(data.addMap);
		}
	};

	const handleDeleteMap = async (_id) => {
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_MAPS }] });
		//loadMap({});
	};

	const editMap = async (_id, newName) => {
		const { data } = await UpdateMap({ variables: { _id: _id, value: newName }});
	}

	const handleSetActive = (_id) => {
		const selectedMap = maps.find(m => m._id === _id);
		loadMap(selectedMap);
	};

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
								<Logo className='logo' />
							</WNavItem>
						</ul>
						<ul>
							<NavbarOptions
								fetchUser={props.fetchUser} auth={auth}
								setShowCreate={setShowCreate} setShowLogin={setShowLogin}
								reloadMaps={refetch} setActiveMap={loadMap}
								username={props.user === null ? '' : props.user.firstName}
								setShowUpdate={setShowUpdate}
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
						<Route
							exact path="/home/welcome"
							name="welcome"
							render={() =>
								<div className="container-secondary">
									<Welcome />
								</div>
							}
						/>
						<Route
							exact path="/home/maps"
							name="maps"
							render={() =>
								<div className="container-secondary">
									<Maps
										maps={maps}
										setShowMapName={setShowMapName}
										setShowDeleteMap={setShowDeleteMap}
										setShowMapEdit={setShowMapEdit}
									/>
								</div>
							}
						/>
					</Switch>
				</WLMain>

				{
					showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
				}

				{
					showLogin && (<Login fetchUser={props.fetchUser} reloadMaps={refetch} setShowLogin={setShowLogin} />)
				}

				{
					showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} user={props.user} />)
				}

				{
					showMapName && (<MapName createNewMap={createNewMap} setShowMapName={setShowMapName} />)
				}

				{
					showMapEdit && (<MapEdit editMap={editMap} setShowMapEdit={setShowMapEdit} editMapId={editMapId}/>)
				}

				{
					showDeleteMap && (<DeleteMapModal deleteMap={handleDeleteMap} setShowDeleteMap={setShowDeleteMap} deleteMapId={deleteMapId} />)
				}


			</WLayout>
		</BrowserRouter>
	);
};

export default Homescreen;
