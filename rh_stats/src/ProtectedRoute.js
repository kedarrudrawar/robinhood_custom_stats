import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    console.log(rest);
    return (
        <Route 
            {...rest} 
            render={
                (props) => {
                    if(rest.auth.isAuthenticated){
                        return <Component {...props} />    
                    }
                    else {
                        return (
                            <Redirect 
                                to={{
                                    pathname: "/",
                                    state : {
                                        from: props.location
                                    }
                                }}
                            />
                        );
                    }
                }   
            } 
        />
    )
}