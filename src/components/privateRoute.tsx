import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../constants/routes';

// There should be no further way to get off this (Disqualified) page or re-enter the information.
// TODO: we could use `extends Route<PrivateRouteProps>` or `React.FC<PrivateRouteProps>` to maintain type safety
export const PrivateRoute = ({ component: Component, ...rest } : any) => {
    const token = localStorage.getItem('disqualified')

    return (
        <Route {...rest} render={props => (
            !token
                ? <Component {...props} />
                : <Redirect to={{ pathname: Routes.DISQUALIFIED, state: { from: props.location } }} />
        )} />
    )
}