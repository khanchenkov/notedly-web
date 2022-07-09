import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import {useNavigate} from "react-router-dom";

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = () => {
    useEffect(() => {
        document.title = 'Sign In — Notedly';
    });
    const navigate = useNavigate();

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn);
            // client.writeData({ data: { isLoggedIn: true } });
            client.writeQuery({
                query: gql`
                    query getAuthState {
                        isLoggedIn
                    }
                `,
                data: {isLoggedIn: true}
            });
            navigate('/')
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {loading && <p>Loading...</p>}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    );
};

export default SignIn;