export interface IUserState {
    username: string,
    token?: string | null,
}

export interface IAuth {
    user: IUserState,
    signin: (username: string, callback: VoidFunction) => void,
    signout: (callback: VoidFunction) => void
}