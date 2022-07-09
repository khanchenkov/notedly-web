import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layouts from "../components/Layouts";
import NotePage from "../components/NotePage";
import EditNote from './edit';
import SignUp from "./signUp";
import SignIn from "./signIn";
import NewNote from './new';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Pages = () => {
    return (
        <BrowserRouter>
            <Layouts>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path="/mynotes" element={<MyNotes />}/>
                        <Route path="/new" element={<NewNote />}/>
                        <Route path="/edit/:id" element={<EditNote/>} />
                    </Route>
                    <Route path="/note/:id" element={<NotePage />}/>
                    <Route path="/signUp" element={<SignUp />}/>
                    <Route path="/signIn" element={<SignIn />}/>
                </Routes>
            </Layouts>
        </BrowserRouter>
    )
}

const PrivateRoutes = () => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return(
        data.isLoggedIn === true ? <Outlet/> : <Navigate to="/signIn"/>
    );
}

export default Pages;