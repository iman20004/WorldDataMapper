import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { useHistory } from "react-router-dom";

const LoggedIn = (props) => {
    const client = useApolloClient();
    const [Logout] = useMutation(LOGOUT);
    let history = useHistory();

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) {
                //props.setActiveRegion({});
                //props.handleSetActiveMap({});
                history.push("/home/welcome");
                props.activeViewer(false, {}, []);
                props.setRoute([]);
                //history.push("/home/welcome");
            }
        }
    };

    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" id='username-label' onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary"> 
                    {props.username}
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" id='createAccount-label' onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account 
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn fetchUser={props.fetchUser} auth={props.auth} setRoute={props.setRoute} activeViewer={props.activeViewer}
                    username={props.username} setShowUpdate={props.setShowUpdate} />
                    //handleSetActiveMap={props.handleSetActiveMap}
                    //setActiveRegion={props.setActiveRegion}/>
            }
        </>

    );
};

export default NavbarOptions;