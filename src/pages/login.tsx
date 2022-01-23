import { FontIcon, Icon, IIconStyles, initializeIcons, IStackTokens, PrimaryButton, Separator, Stack, TextField } from "@fluentui/react"
import React, { KeyboardEventHandler, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/auth-context";
import TitleSeparator from "../components/generic/title-separator";
import { useForm } from "../hooks/use-form";
import { IAuth } from "../interfaces/IAuth";
import { IUser } from "../interfaces/IUser";
import { PAS_DEF, US_DEF } from "../util/helper";

const iconProps = { iconName: 'CreateMailRule' };
const iconStyles: IIconStyles = {
    root: {
        fontSize: '24px',
        height: '24px',
        width: '24px',
    },
};
const stackTokens: IStackTokens = { childrenGap: 12 };
const userIcon = 'TemporaryUser';

export const Login = () => {
    initializeIcons();

    const { signin, user  } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, password, form, _handleChange } = useForm<IUser>({
        username: '',
        password: ''
    })

    /* Functions */
    const _pressLogin = (ev?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (ev != undefined) {
            if (ev.code === 'Enter' || ev.code === 'NumpadEnter') {
                _handleLogin();
            }
        }
    }

    const _handleLogin = () => {
        if (username === US_DEF && password === PAS_DEF) {
            signin(username, () => navigate('/adm/products', { replace: true }))
        } else {
            alert('ERROR');
        }
    }

    return (
        <>
            <pre>{ JSON.stringify(user, null, 2) }</pre>
            <pre>{ JSON.stringify(user, null, 2) }</pre>

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <pre>{JSON.stringify(form, null, 2)}</pre>
                    </div>

                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <form>
                            <div style={{
                                paddingTop: '25%'
                            }}>
                                <div className="ms-depth-8" style={{
                                    padding: '20px',
                                }}>
                                    <>
                                        <div style={{
                                            paddingBottom: '10vh',
                                        }}>
                                            <Stack tokens={stackTokens}>
                                                <div style={{
                                                    textAlign: 'center',
                                                }}>
                                                    <FontIcon aria-label={userIcon} iconName={userIcon} style={{
                                                        fontSize: 70,
                                                        height: 70,
                                                        width: 70,
                                                    }} />
                                                </div>
                                                <TitleSeparator title='Logged in' />
                                            </Stack>
                                        </div>

                                        <TextField
                                            name='username'
                                            placeholder='Email'
                                            iconProps={iconProps}
                                            autoComplete='off'
                                            value={username}
                                            onChange={_handleChange}
                                            onKeyPress={_pressLogin} 
                                            />

                                        <br />

                                        <TextField
                                            name='password'
                                            placeholder='Password'
                                            type="password"
                                            canRevealPassword
                                            revealPasswordAriaLabel="Show password"
                                            autoComplete='off'
                                            value={password}
                                            onChange={_handleChange} 
                                            onKeyPress={_pressLogin}/>
                                        <br />

                                        <div style={{
                                            textAlign: 'center'
                                        }}>
                                            <PrimaryButton text="Login" onClick={_handleLogin} />
                                        </div>
                                    </>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}