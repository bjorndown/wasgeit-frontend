import * as React from "react";
import * as ReactDOM from "react-dom";

import {WasGeit} from "./components/wasgeit";

ReactDOM.render(
    <WasGeit/>,
    document.getElementById("wasgeit")
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                console.debug('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
            console.debug('ServiceWorker registration failed: ', err);
        });
    });
}