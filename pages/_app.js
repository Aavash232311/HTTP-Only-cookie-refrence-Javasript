import '../styles/globals.css';
import * as React from 'react';


function MyApp({Component, pageProps}) {
    return (
        <div style={{color: "black"}}>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp;

