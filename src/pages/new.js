import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import {useNavigate} from "react-router-dom";

import NoteForm from '../components/NoteForm';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import {NEW_NOTE} from "../gql/mutation";


const NewNote = props => {

    useEffect(() => {
        document.title = 'New Note — Notedly';
    });

    const navigate = useNavigate();

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        refetchQueries: [{query: GET_MY_NOTES},{ query: GET_NOTES }],
        onCompleted: data => {
            navigate(`../note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error saving the note</p>}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;
