import { createContext } from "react";
import { IAuth } from "../../interfaces/IAuth";

export const AuthContext = createContext<IAuth>(null!);