import { useContext } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/context/auth-context";
import { NavBar } from "../components/navbar/navbar";
import NavbarTest from "../components/navbar/navbar-test";
import { Sidebar } from "../components/sidebar/sidebar";
import { Login } from "../pages/login"
import { ALFA, ROUTE_INITAL } from "../util/helper";

const Verified = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    console.log(user);

    if (!user.token) {
        console.log('unauthorized');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <>
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <NavbarTest />
                    </div>  
                </div>
            </div>
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <Sidebar />
                    </div>
                    <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10">
                        <Outlet />      
                    </div>
                </div>
            </div>
        </>
    )
}

const ExistSesion = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if  (!user.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Navigate to={ROUTE_INITAL} state={{ from: location }} replace />;
}

const PageOne = () => {
    const { signout } = useContext(AuthContext);
    const navigate = useNavigate();

    const _handleSignout = () => {
        signout(() => navigate('/login', { replace: true }))
    }

    const d = localStorage.getItem(ALFA);
    let info = {};
    if (d) {
        info = JSON.parse(d);
    }

    return (
        <>
            <pre>{ JSON.stringify(info, null, 2) }</pre>
            
            <button onClick={_handleSignout}>Logout</button>
        </>
    );
}

export const ContentRouter = () => {
    return (
        <>
            <Routes>
                {/* Public route */}
                <Route path='/' element={<ExistSesion />} />
                <Route path='login' element={<Login />} />

                {/* Private route */}
                <Route path="adm" element={<Verified />}>
                    <Route path='products' element={<PageOne />} />
                    <Route path='cuadro-mando' element={<div>ABOUT</div>} />
                    <Route path='configuration' element={<div>CONFIGURATION</div>} />
                    <Route path='*' element={<Navigate replace to='/login' />} />
                </Route>
                
                <Route path='*' element={<Navigate replace to='/login' />} />
            </Routes>
        </>
    )
}