import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
const CrudRoute = ({ resource, list, create, edit, show, remove }) => {
    // inject the resource prop
    const ResourcePage = component => routeProps => createElement(component, { resource, ...routeProps })

    return (
        <Switch>
            <Route 
                exact 
                path={`/${resource}`}
                render={ResourcePage(list)}
            />
            <Route
                exact
                path={`/${resource}/create`}
                render={ResourcePage(create)}
            />
            <Route
                exact
                path={`/${resource}/:id`}
                render={ResourcePage(edit)}
            />
            <Route
                exact
                path={`/${resource}/:id/show`}
                render={ResourcePage(show)}
            />
            <Route
                exact
                path={`/${resource}/:id/delete`}
                render={ResourcePage(remove)}
            />
        </Switch>
    )
}

export default CrudRoute
