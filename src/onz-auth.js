import EventEmitter from './lib/event-emiter';
import { OnzAuthEnum, OnzEvents } from './constants';
import { OnzLoginComponent } from './login';
import axios from 'axios';

/**
 * Handles all the browser's authentication flows
 * @constructor
 * @param {Object} options
 * @param {String} options.clientID the Client ID found on your project overview page
 * @param {String} [options.containerID] the element container id, will default to 'container'
 * @param {String} [options.isIframe] boolean value indicating whether it is a popup or iframe
 * @param {String} [options.mode] 'production' or 'development', defaults to 'production'
 */
export class Auth extends EventEmitter {
    constructor(options) {
        super();
        if (!options) {
            throw new Exception("invalid auth options");
        }
        if (!options.clientID) {
            throw new Exception("invalid clientID");
        }
        this.clientID = options.clientID;
        this.containerID = options.containerID ?? 'container';
        this.isIframe = !!options.isIframe ? 'iframe' : 'popup';
        this.mode = options.mode ?? 'production';
        
        this._initialiseURL();
        this._initialiseComponent();
    }

    _initialiseURL() {
        if (this.mode === 'development') {
            this.urls = OnzAuthEnum.Development;
        } else {
            this.urls = OnzAuthEnum.Production;
        }
    }

    _initialiseComponent() {
        this.component = OnzLoginComponent({
            clientID: this.clientID,
            apiURL: this.urls.IdpUrl,
            onLogin: function (authResult) {
                console.log(OnzEvents.OnAuthenticated, authResult);
                this.emit(OnzEvents.OnAuthenticated, authResult);
            },
            onLoginError: function (errorMessage) {
                console.log(OnzEvents.OnError, errorMessage);
                this.emit(OnzEvents.OnError, errorMessage);
            },
            onClose: () => {
                console.log(OnzEvents.OnClosed);
                this.emit(OnzEvents.OnClosed);
            },
            onError: (err) => {
                const message = err.message ? err.message.toString() : '';
                console.log(message);
                this.emit(OnzEvents.OnError, err);
            }
        });
    }
    
    showLogin() {
        this.component.render(`#${this.containerID}`, this.isIframe);
    }

    refreshAccessToken() {

    }

    signOut() {

    }

    isAuthenticated() {

    }

    getOAuthTokens() {

    }

    getAccessToken() {

    }

    getDecodedAccessToken() {

    }

    getIDToken() {

    }

    getDecodedIdToken() {

    }

    getRefreshToken() {

    }
}