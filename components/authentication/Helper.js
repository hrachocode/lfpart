import React from 'react';

export const Feild = (emailValid, passwordValid, inputValid, newPasswordValid, error) => {

    return(
        <React.Fragment>
            {!emailValid && <React.Fragment>
                <span className="email-valid">Specify exact mail.</span>
                <br/>
            </React.Fragment>}
            {!passwordValid || newPasswordValid===false ? <React.Fragment>
                <span className="password-valid">Password must containt at least 8 letters 1 uppercase.</span>
                <br/>
            </React.Fragment> : null}
            {!inputValid && <span className="all-input-valids">Red outline are required.</span>}
            {error && <span className="all-input-valids">{error}</span>}
        </React.Fragment>
    )
}