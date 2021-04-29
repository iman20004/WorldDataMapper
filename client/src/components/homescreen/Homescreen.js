import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';


const Homescreen = (props) => {

	const auth = props.user === null ? false : true;
	let maps 	= [];
	const [activeMap, setActiveMap] 		= useState({});
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
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
		console.log(props.user.firstName)
		// if a list is selected, shift it to front of maps
		if(activeMap._id) {
			let selectedMapIndex = maps.findIndex(entry => entry._id === activeMap._id);
			let removed = maps.splice(selectedMapIndex, 1);
			maps.unshift(removed[0]);
		}
	}


	
	// NOTE: might not need to be async
	const reloadMap = async () => {
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
		setActiveMap(map);

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadMap()
	}

	const [AddRegion] 			= useMutation(mutations.ADD_REGION, mutationOptions);


	const handleSetActive = (_id) => {
		const selectedMap= maps.find(m => m._id === _id);
		loadMap(selectedMap);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};

	return (
		<WLayout wLayout="header-lside">
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
							username={props.user.firstName}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				{
					activeMap ? 
					
							<div className="container-secondary">
								
							</div>
						:
							<div className="container-secondary" />
				}

			</WLMain>

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadMaps={refetch} setShowLogin={setShowLogin} />)
			}

		</WLayout>
	);
};

export default Homescreen;