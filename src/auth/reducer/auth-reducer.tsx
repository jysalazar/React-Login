import { IAction } from "../../interfaces/IAction";

const isAuthenticated = { loggedIn: false };

export function authReducer(state = isAuthenticated, action: IAction) {
  switch (action.type) {
    case "login":
      return { ...action.payload, loggedIn: true };
    case "logout":
      return { loggedIn: false };

    default:
      return state;
  }
}
