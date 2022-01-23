import { useEffect, useState } from "react";
import { fakeAuthProvider } from "../../demo-auth/fake-provider";
import { IUserState } from "../../interfaces/IAuth";
import { ALFA } from "../../util/helper";

import { AuthContext } from "../context/auth-context";

export const AuthProvider2 = ({ children }: { children: React.ReactNode }) => {
    const userDefault: IUserState = {
        username: ''
    }

    const initUser = () => {
        const d = localStorage.getItem(ALFA);
        if (!d) {
            return userDefault;
        }

        const info: IUserState = JSON.parse(d);
        if (info.token) {
            return info;
        }

        return userDefault;
    }
    
    const [user, setUser] = useState<IUserState>(initUser);

    /* Effect */
    useEffect(() => {
        localStorage.setItem(ALFA, JSON.stringify(user));
    }, [user])

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(
                {
                    ...user,
                    username: newUser,
                    token: 'my token',
                }
            );
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(userDefault);
            callback();
        });
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}