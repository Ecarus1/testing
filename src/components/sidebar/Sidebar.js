import { ProSidebar, SidebarHeader, MenuItem, SidebarContent} from "react-pro-sidebar";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { sidebarSelector } from "./SidebarSlice";
import { hiddenSidebar } from "./SidebarSlice";

import {ReactComponent as Logo} from "../../assets/icon-menu.svg";
import {ReactComponent as Person} from "../../assets/icon-person.svg";
import {ReactComponent as Diagramma} from "../../assets/icon-diagramma.svg";
import 'react-pro-sidebar/dist/css/styles.css';
import './custom.scss'

const Sidebar = () => {
    const dispatch = useDispatch();
    const {sidebar} = useSelector(sidebarSelector);

    // const [sidebar, setSidebar] = useState(true);

    // const onToggle = () => {
    //     setSidebar(!sidebar);
    // }

    return (
        <ProSidebar collapsed={sidebar}>
            <SidebarHeader>
                <div className="header__box" onClick={() => dispatch(hiddenSidebar())}>
                    <Logo fill="#FFFFFF" width="16" height="16"/>
                    <h1 className="header__title" style={{"color": "#FFFFFF"}}>processet</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <MenuItem icon={<Person />}> Profile</MenuItem>

                <MenuItem icon={<Diagramma />}> Список процессов</MenuItem>
            </SidebarContent>
        </ProSidebar>
    );
}

export default Sidebar;