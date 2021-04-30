import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import UpdateAccount					from '../modals/UpdateAccount';
import CreateAccount 					from '../modals/CreateAccount';
import Maps 							from '../main/Maps';
import Welcome 							from '../Welcome';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain } from 'wt-frontend';


const Homescreen = (props) => {

	const auth = props.user === null ? false : true;
	let maps 	= [];
	const [activeMap, setActiveMap] 		= useState({});
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);
	//const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	//const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign maps 
		for(let map of data.getAllMaps) {
			maps.push(map)
		}
		// if a list is selected, shift it to front of maps
		if(activeMap._id) {
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

	const [AddRegion] 			= useMutation(mutations.ADD_REGION, mutationOptions);
	const [AddMap] 				= useMutation(mutations.ADD_MAP);

	const createNewMap = async () => {
		console.log("here")
		let newMap = {
			_id: '',
			name: 'Untitled',
			owner: props.user._id,
			regions: []
		}
		const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_MAPS }] });
		if(data) {
			loadMap(data.addMap);
		} 	
	};


	const handleSetActive = (_id) => {
		const selectedMap= maps.find(m => m._id === _id);
		loadMap(selectedMap);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
		console.log(!showUpdate)
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDelete(!showDelete)
	};

	return (
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
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadMaps={refetch} 			setActiveMap={loadMap}
							username={props.user === null? '' : props.user.firstName}
							setShowUpdate={setShowUpdate} 
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				{
					!auth ? 
					
							<div className="container-secondary">
								<Welcome/>
							</div>
						:
							<div className="container-secondary">
								<Maps
									maps={maps}
									createNewMap={createNewMap}
								/>
							</div>	
				}

			</WLMain>

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadMaps={refetch} setShowLogin={setShowLogin} />)
			}

{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	);
};

export default Homescreen;