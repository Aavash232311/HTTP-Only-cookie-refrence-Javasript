import '../styles/globals.css';
import * as React from 'react';
import Router from 'next/router';


let overflow = 0;

function MyApp({Component, pageProps}) {
    if (overflow === 0) {
            try {
                let token = localStorage.getItem('token');
                if (token === null){
                    Router.push('/login');
                }
            } catch (err) {

            }
    }
    overflow++;
    return (
        <div style={{color: "black"}}>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp;

