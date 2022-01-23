import { useReducer } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/context/auth-context";
import { AuthProvider2 } from "./auth/provider/auth-provider";
import { authReducer } from "./auth/reducer/auth-reducer";
import { NavBar } from "./components/navbar/navbar"
import { Sidebar } from "./components/sidebar/sidebar"
import { ContentRouter } from "./routes/content-router"
import { ALFA } from "./util/helper";

const init = () => {
    let sessionUser: any = sessionStorage.getItem(ALFA);
    let user: any;
    if (!sessionUser) {
        user = sessionUser;
    } else {
        user = JSON.parse(sessionUser);
    }
    return user;
};

export const App = () => {
    return (
        <AuthProvider2>
            <ContentRouter />
        </AuthProvider2>
    );
}

/* export const ContentApp = () => {
    return (
        <>
            <NavBar />
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <Sidebar />
                    </div>
                    <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10">
                        <ContentRouter />
                    </div>
                </div>
            </div>
        </>
    )
} */