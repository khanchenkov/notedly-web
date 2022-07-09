import { gql } from '@apollo/client';

const EDIT_NOTE = gql`
    mutation updateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
            createdAt
            favorite_count
            favorited_by {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            created
            favorite_count
            favorited_by {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id)
    }
`;

const TOGGLE_FAVORITE = gql`
    mutation toggleFavorite($id: ID!) {
        toggleFavorite(id: $id) {
            id
            favorite_count
        }
    }
`;


export { EDIT_NOTE, NEW_NOTE, DELETE_NOTE, TOGGLE_FAVORITE };