import React from 'react';

function HomePage() {
    return (
        <div>
            Welcome Home!
            <button onClick={() => console.log('Clicked!')}>Click me!</button>
        </div>
    );
}

export default {
    component: HomePage
};