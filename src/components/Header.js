import React from 'react';
import styled from 'styled-components';
import {useQuery, gql} from '@apollo/client';
import {Link, useNavigate} from 'react-router-dom';
import ButtonAsLink from "./ButtonAsLink";

const HeaderBar = styled.header`
     width: 100%;
     padding: 0.5em 1em;
     display: flex;
     height: 64px;
     position: fixed;
     align-items: center;
     background-color: #fff;
     box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
     z-index: 1;
`;

const LogoText = styled.h1`
     margin: 0;
     padding: 0;
     display: inline;
`;

const UserState = styled.div`
 margin-left: auto;
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Header = () => {

    const {data, client} = useQuery(IS_LOGGED_IN);
    const navigate = useNavigate();

    const logOutHandler = () => {
        localStorage.removeItem('token');
        client.resetStore();
        client.writeQuery({
            query: gql`
                query getAuthState {
                    isLoggedIn
                }
            `,
            data: {isLoggedIn: false}
        });
        navigate('/');
    }

    return (
        <HeaderBar>
            <img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt="Notedly Logo" height="40" />
            <LogoText>Noteddly</LogoText>
            <UserState>
                {
                    data.isLoggedIn
                    ? (<ButtonAsLink onClick={logOutHandler}>Logout</ButtonAsLink>)
                    : (<p>
                        <Link to="/signIn">Sign In</Link> or{' '}
                        <Link to="/signUp">Sign Up</Link>
                    </p>)
                }
            </UserState>
        </HeaderBar>
    );
};
export default Header;
