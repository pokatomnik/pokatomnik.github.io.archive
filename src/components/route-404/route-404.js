import React from 'react';

const BLOCK_NAME = 'route-404';

export default function Route404() {
    return (
        <div className={BLOCK_NAME}>
            <h1>
                404!
            </h1>
            <p>
                Sorry, the page you looking for was not found. Try to use top navigation bar to get out of here.
            </p>
        </div>
    );
}
