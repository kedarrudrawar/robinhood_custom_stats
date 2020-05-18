import React from 'react';
import {Helmet} from 'react-helmet';

export const Head = () => {
    return(
        <Helmet>
            <meta charset="UTF-8" />
            <title>Portfolio Statistics</title>
            <link rel="stylesheet" href="styles.css"/>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans"/>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed"/>
        </Helmet>
    );
};