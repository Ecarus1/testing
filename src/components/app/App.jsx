import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import UniversalBlank from "../pages/universalBlank/UniversalBlank";
import HomePage from "../pages/homePage/HomePage";
import RegistrLayout from "../registrLayout/RegistrLayout"
import LoginLayout from "../loginLayout/LoginLayout";
import ProcessList from "../processList/ProcessList";
import PrivateRoute from "../../hoc/PrivateRoute";
import PublicRoute from "../../hoc/PublicRoute";
import { useEffect } from "react";
import { useAuthStatus } from "../../hooks/authStatus.hook";
import { useDispatch } from "react-redux";
import { loginCheckUser } from "../loginLayout/LoginSlice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("App")
        if(localStorage.getItem('token')) {
            console.log("App token");
            let data = localStorage.getItem('token')
            dispatch(loginCheckUser())
        }
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <HomePage Component={ProcessList}/>
                    </PrivateRoute>
                }/>

                <Route path="/registr" element={
                    <PublicRoute>
                        <UniversalBlank Component={RegistrLayout} dataType='reg'/>
                    </PublicRoute>
                }/>
                <Route path="/login" element={
                    <PublicRoute>
                        <UniversalBlank Component={LoginLayout} dataType='log'/>
                    </PublicRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
