import { useState } from "react";

export const useAuth = () => {
    const [authed, setAuthed] = useState(false);

    const login = () => {
        return new Promise((res) => {
            setAuthed(true);
            res(authed);
        })
    };
    
    const logout = () => {
        return new Promise((res) => {
        setAuthed(false);
        res(authed);
        })
    };

    return {
        authed,
        login,
        logout
    }
}