import * as React from "react";
import * as ReactDOM from "react-dom";

import { WasGeit } from "./components/wasgeit";

ReactDOM.render(
    <WasGeit />,
    document.getElementById("wasgeit")
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}