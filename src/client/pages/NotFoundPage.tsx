import React from 'react';

function NotFoundPage({ staticContext = {} }) {
    staticContext.notFound = true;
    return <h1>Oops, route not found</h1>
}

export default {
    component: NotFoundPage
};
