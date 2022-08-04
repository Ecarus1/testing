import { useDispatch, useSelector} from "react-redux";

import Sidebar from "../../sidebar/Sidebar";

import {ReactComponent as Logo} from "../../../assets/icon-menu.svg";
import "./HomePage.scss";
import { hiddenSidebar, sidebarSelector } from "../../sidebar/SidebarSlice";

const HomePage = ({Component}) => {
    const {sidebar} = useSelector(sidebarSelector)
    const dispatch = useDispatch();



    return (
        <div className="container">
            <header className="header">
                <div className="header__box" onClick={() => dispatch(hiddenSidebar())}>
                    <Logo fill="#6879BB" width="16" height="16"/>
                    <h1 className="header__title">меню</h1>
                </div>
            </header>

            <main className="main">
                <Component/>
            </main>

            {sidebar ? null : <div className="block-shadow" onClick={() => dispatch(hiddenSidebar())}></div>}

            <Sidebar />
        </div>
    );
}
 
export default HomePage;