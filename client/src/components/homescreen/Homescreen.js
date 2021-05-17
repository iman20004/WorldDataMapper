import Logo from '../navbar/Logo';
import Path from '../navbar/Path';
import Arrows from '../navbar/Arrows';
import Login from '../modals/Login';
import UpdateAccount from '../modals/UpdateAccount';
import CreateAccount from '../modals/CreateAccount';
import DeleteMapModal from '../modals/DeleteMapModal';
import DeleteRegionModal from '../modals/DeleteRegionModal';
import DeleteLandmarkModal from '../modals/DeleteLandmarkModal';
import EditLandmarkModal from '../modals/EditLandmarkModal';
import ChangeParentModal from '../modals/ChangeParentModal';
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
import {
	UpdateRegion_Transaction, SortRegions_Transaction, changeParent_Transaction,
	EditRegion_Transaction, UpdateLandmarks_Transaction, EditLandmark_Transaction
} from '../../utils/jsTPS';





const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let regions = [];
	let maps = [];

	const [activeRegion, setActiveRegion] = useState({});
	const [route, setRoute] = useState([]);

	//const [activeMap, setActiveMap] = useState({});
	const [activeViewer, toggleActiveViewer] = useState(false);
	const [deleteMapId, setDeleteMap] = useState('');
	const [editMapId, setEditMap] = useState('');
	const [deleteRegion, setDeleteRegion] = useState({});
	const [deleteIndex, setDeleteIndex] = useState(-1);
	const [deleteLandRegion, setDeleteLandRegion] = useState({});
	const [deleteLand, setDeleteLand] = useState('');

	const [sub, setSub] = useState([]);
	const [regionInViewer, setRegionInViewer] = useState({});

	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showDeleteMap, toggleShowDeleteMap] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [showMapName, toggleShowMapName] = useState(false);
	const [showMapEdit, toggleShowMapEdit] = useState(false);
	const [showDeleteRegion, toggleShowDeleteRegion] = useState(false);
	const [showDeleteLandmark, toggleShowDeleteLandmark] = useState(false);
	const [showEditLandmark, toggleShowEditLandmark] = useState(false);
	const [showChangeParent, toggleShowChangeParent] = useState(false);


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
		if (regions) {
			setActiveRegion({})
		}

	}

	const loadRegion = () => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
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

	const handleSetActiveViewer = (bool, reg, subregions) => {
		setSub(subregions);
		setRegionInViewer(reg);
		toggleActiveViewer(bool);
	}

	const [AddRegion] = useMutation(mutations.ADD_REGION, mutationOptions);
	const [DeleteRegion] = useMutation(mutations.DELETE_REGION, mutationOptions);
	const [UpdateRegion] = useMutation(mutations.UPDATE_REGION, mutationOptions);
	const [UpdateRegionArray] = useMutation(mutations.UPDATE_REGION_ARRAY, mutationOptions);
	const [AddLandmark] = useMutation(mutations.ADD_LANDMARK, mutationOptions);
	const [DeleteLandmark] = useMutation(mutations.DELETE_LANDMARK, mutationOptions);
	const [EditLandmark] = useMutation(mutations.EDIT_LANDMARK, mutationOptions);
	const [changeParent] = useMutation(mutations.CHANGE_PARENT, mutationOptions);


	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}


	// MAP STUFF

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
		const { data } = await AddRegion({ variables: { region: newMap, index: -1 }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			console.log(data)
			reload();
		}
	};

	const handleDeleteMap = async (_id) => {
		DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
	};

	const editMap = async (_id, newName) => {
		const { data } = await UpdateRegion({ variables: { _id: _id, value: newName, field: 'name' } });
	};


	// REGION STUFF

	const createNewRegion = async (parent) => {
		let opcode = 1;
		let newRegion = {
			_id: '',
			owner: props.user._id,
			name: 'Untitled',
			capital: 'No Capital',
			leader: 'No Leader',
			landmarks: [],
			root: false,
			parentId: parent._id,
			childrenIds: []
		}

		//let oldChildren = parent.childrenIds;
		//let regionId = newRegion._id;

		let transaction = new UpdateRegion_Transaction(parent._id, newRegion, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();

		/*
		const { data } = await AddRegion({ variables: { region: newRegion }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			reload();
		}*/
	};

	const handleDeleteRegion = async (region, index) => {
		let opcode = 0;
		let regionToDelete = {
			_id: region._id,
			owner: region.owner,
			name: region.name,
			capital: region.capital,
			leader: region.leader,
			landmarks: region.landmarks,
			root: region.root,
			parentId: region.parentId,
			childrenIds: region.childrenIds
		}

		let transaction = new UpdateRegion_Transaction(region.parentId, regionToDelete, opcode, AddRegion, DeleteRegion, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

		//DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
	};

	const editRegion = async (_id, field, value, prev) => {
		let transaction = new EditRegion_Transaction(_id, field, prev, value, UpdateRegion);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
		//const { data } = await UpdateRegion({ variables: { _id: _id, value: value, field: field } });
	};

	const sortRegions = async (region, field, children) => {

		//check if all same at that field
		let same = true;
		let first = children[0][field];
		for (let i = 1; i < children.length; i++) {
			if (first !== children[i][field]) {
				same = false;
				break;
			}
		}

		let increasingOrder = true;
		for (let i = 0; i < children.length - 1; i++) {
			if (children[i][field] > children[i + 1][field]) {
				increasingOrder = false;
				break;
			}
		}

		let sortIncreasing = true;
		if (increasingOrder) {
			sortIncreasing = false;
		};

		children = children.sort(function (item1, item2) {
			let negate = -1;
			if (sortIncreasing) {
				negate = 1;
			}
			let value1 = item1[field];
			let value2 = item2[field];
			if (value1 < value2) {
				return -1 * negate;
			}
			else if (value1 === value2) {
				return 0;
			}
			else {
				return 1 * negate;
			}
		});

		let newChildren = [];
		for (let i = 0; i < children.length; i++) {
			newChildren.push(children[i]._id)
		}

		let arr = 'childrenIds'


		if (!same) {
			let transaction = new SortRegions_Transaction(region._id, region.childrenIds, newChildren, UpdateRegionArray, arr);
			props.tps.addTransaction(transaction);
			tpsRedo();
		}

	};




	//REGION VIEWER STUFF

	const handleAddLandmark = async (region, newLand) => {
		let opcode = 1;
		let transaction = new UpdateLandmarks_Transaction(region._id, newLand, opcode, AddLandmark, DeleteLandmark);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const handleDeleteLandmark = async (region, landToDelete) => {
		let opcode = 0;
		let index = region.landmarks.indexOf(landToDelete);

		let transaction = new UpdateLandmarks_Transaction(region._id, landToDelete, opcode, AddLandmark, DeleteLandmark, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const editLandmark = async (reg, oldLand, newLand) => {
		
		let transaction = new EditLandmark_Transaction(reg._id, oldLand, newLand, EditLandmark);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const handleChangeParent = async (reg, newParent) => {
		let oldParent = reg.parentId;
		let old = regions.find(reg => reg._id === oldParent);
		let index = old.childrenIds.indexOf(reg._id);

		let transaction = new changeParent_Transaction(reg._id, newParent, oldParent, changeParent, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
		reload();
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

	const setShowDeleteRegion = (reg, index) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		setDeleteRegion(reg);
		setDeleteIndex(index);
		toggleShowDeleteRegion(!showDeleteRegion);
	};

	const setShowDeleteLandmark = (reg, land) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		setDeleteLandRegion(reg);
		setDeleteLand(land);
		toggleShowDeleteLandmark(!showDeleteLandmark);
	};

	const setShowEditLandmark = (reg, land) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteLandmark(false);
		setDeleteLandRegion(reg);
		setDeleteLand(land);
		toggleShowEditLandmark(!showEditLandmark)
	};

	const setShowChangeParent = (regionToMove) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDeleteRegion(false);
		toggleShowDeleteLandmark(false);
		toggleShowEditLandmark(false);
		setDeleteRegion(regionToMove);
		toggleShowChangeParent(!showChangeParent);
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
									reload={loadRegion}
								//handleSetActiveMap={handleSetActiveMap}
								//handleSetActiveRegion={handleSetActiveRegion}
								/>
							</WNavItem>
						</ul>
						<ul>
							<WNavItem className='middle-header'>
								{
									(route.length >= 0) ?
										<div className='region-nav'>
											<Path className='logo'
												route={route}
												activeViewer={handleSetActiveViewer}
												reload={loadRegion}
											/>
											{
												(activeViewer) ?
													<Arrows
														reg={regionInViewer}
														subregions={sub}
														activeViewer={handleSetActiveViewer}
														reload={loadRegion}
													/>
													: <div></div>
											}
										</div>
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
								reload={loadRegion}
							//setActiveRegion={loadMap}
							//handleSetActiveMap={handleSetActiveMap}
							/>
						</ul>
					</WNavbar>
					<div className='white-line'></div>
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
									editMap={editMap}
								//setRoute={handleSetRoute}
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
									activeViewer={handleSetActiveViewer}
									reload={loadRegion}
									editRegion={editRegion}
									setShowDeleteRegion={setShowDeleteRegion}
									sortRegions={sortRegions}
									undo={tpsUndo} redo={tpsRedo}
									canUndo={canUndo} canRedo={canRedo}
								//tps={props.tps}
								//route={route}
								//activeRegion={activeRegion}
								//subRegions={childs}
								//handleSetActiveRegion={handleSetActiveRegion}
								/>
							</div>
						</Route>

						<Route path="/home/regionviewer/:id">
							<div className="container-secondary1">
								<RegionViewer
									regions={regions}
									activeViewer={handleSetActiveViewer}
									undo={tpsUndo} redo={tpsRedo}
									canUndo={canUndo} canRedo={canRedo}
									addLandmark={handleAddLandmark}
									reload={loadRegion}
									setRoute={handleSetRoute}
									setShowDeleteLandmark={setShowDeleteLandmark}
									setShowEditLandmark={setShowEditLandmark}
									setShowChangeParent={setShowChangeParent}
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

				{
					showDeleteRegion && (<DeleteRegionModal deleteRegion={handleDeleteRegion}
						setShowDeleteRegion={setShowDeleteRegion} regionToDelete={deleteRegion}
						deleteIndex={deleteIndex}
					/>)
				}

				{
					showDeleteLandmark && (<DeleteLandmarkModal deleteLandmark={handleDeleteLandmark} setShowDeleteLandmark={setShowDeleteLandmark}
						deleteLandRegion={deleteLandRegion} deleteLand={deleteLand} />)
				}

				{
					showEditLandmark && (<EditLandmarkModal editLandmark={editLandmark} setShowEditLandmark={setShowEditLandmark}
						editRegion={deleteLandRegion} oldLand={deleteLand} />)
				}

				{
					showChangeParent && (<ChangeParentModal handleChangeParent={handleChangeParent} setShowChangeParent={setShowChangeParent} 
						regionToMove={deleteRegion} regions={regions} />)
				}

			</WLayout>

		</BrowserRouter>
	);
};

export default Homescreen;


