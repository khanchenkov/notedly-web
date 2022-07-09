import React, {useEffect} from 'react';
import {useMutation, useApolloClient, gql} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = (props) => {

    useEffect(() => {
        document.title = 'Sign Up - Notedly';
    });

    const navigate = useNavigate();
    const client = useApolloClient();

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signUp)
            if (error) {
                console.log(error)
            } else {
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
        }
    })

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    )
}

export default SignUp;