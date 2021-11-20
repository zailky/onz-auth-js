import EventEmitter from './lib/event-emiter';
import { OnzAuthEnum, OnzEvents } from './constants';
import { OnzLoginComponent } from './login';
import { OnzLogoutComponent } from './logout';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

/**
 * Handles all the browser's authentication flows
 * @constructor
 * @param {Object} options
 * @param {String} options.clientID the Client ID found on your project overview page
 * @param {String} [options.containerID] the element container id, will default to 'container'
 * @param {String} [options.isIframe] boolean value indicating whether it is a popup or iframe 
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
    }

    _initialiseURL() {
        if (this.mode === 'development') {
            this.urls = OnzAuthEnum.Development;
        } else if (this.mode === 'debug') {
            this.urls = OnzAuthEnum.Debug;
        } else {
            this.urls = OnzAuthEnum.Production;
        }
    }

    _newLoginComponent() {
        return OnzLoginComponent({
            clientID: this.clientID,
            idpURL: this.urls.IdpURL,
            onLogin: authResult => {
                this._setSession(authResult);
                this.emit(OnzEvents.OnAuthenticated, authResult);
            },
            onLoginError: errorMessage => {
                this.emit(OnzEvents.OnError, errorMessage);
            },
            onClose: () => {                
                this.emit(OnzEvents.OnClosed);
            },
            onError: (err) => {
                const message = err && err.message ? err.message.toString() : err;
                this.emit(OnzEvents.OnError, message);
            }
        });
    }

    _newLogoutComponent(idToken) {
        return OnzLogoutComponent({
            idToken: idToken,
            clientID: this.clientID,
            idpURL: this.urls.IdpURL,
            onLogout: () => {
                this._setSession(null);
                this.emit(OnzEvents.OnLoggedOut, authResult);
            },
            onLogoutError: errorMessage => {
                this.emit(OnzEvents.OnError, errorMessage);
            },
            onClose: () => {
                this.emit(OnzEvents.OnClosed);
            },
            onError: (err) => {
                const message = err && err.message ? err.message.toString() : err;
                this.emit(OnzEvents.OnError, message);
            }
        });
    }

    _setSession(authResult) {
        if (authResult) {
            if (authResult.accessToken) {
                localStorage.setItem('access_token', authResult.accessToken);
            }

            if (authResult.idToken) {
                localStorage.setItem('id_token', authResult.idToken);
            }

            if (authResult.refreshToken) {
                localStorage.setItem('refresh_token', authResult.refreshToken);
            }

            if (authResult.expiry) {
                localStorage.setItem('expiry', authResult.expiry);
            }
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('expiry');
        }
    }
    
    showLogin() {
        this._newLoginComponent().render(`#${this.containerID}`, this.isIframe);
    }

    refreshAccessToken(refreshToken = this.getRefreshToken()) {
        const path = new URL('public/refresh', this.urls.IdpApiURL).href;
        axios
            .post(path, {
                clientId: this.clientID,
                refreshToken
            })
            .then(response => {
                if (response.data) {
                    this._setSession(response.data);
                    this.emit(OnzEvents.OnRefreshed, response.data);
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {                    
                    this.emit(OnzEvents.OnError, error.response.data.message);
                } else {
                    this.emit(OnzEvents.OnError, 'unknown-error');                    
                }
            });
    }

    logout(idToken = this.getIDToken()) {
        // const existing = document.getElementById('onzHiddenFrame');
        // if (existing === null) {
        //     const hiddenDiv = document.createElement('div');
        //     hiddenDiv.style.display = 'none';
        // }
        this._newLogoutComponent(idToken).render(`#${this.containerID}`, this.isIframe);
    }

    isAuthenticated(accessToken = this.getAccessToken()) {
        if (!accessToken) {
            return false;
        }
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        }

        return true;
    }

    getOAuthTokens() {
        if (localStorage.getItem('access_token')) {
            return {
                accessToken: localStorage.getItem('access_token'),
                idToken: localStorage.getItem('id_token'),
                refreshToken: localStorage.getItem('refresh_token'),
                expiry: localStorage.getItem('expiry')
            };
        }

        return null;
    }

    getAccessToken() {
        return window.localStorage.getItem('access_token');
    }

    getDecodedAccessToken() {
        const token = this.getAccessToken();
        const decoded = jwtDecode(token);
        if (!decoded) {
            return null;
        }
        return decoded;
    }

    getIDToken() {
        return window.localStorage.getItem('id_token');
    }

    getDecodedIDToken() {
        const token = this.getIDToken();
        const decoded = jwtDecode(token);
        if (!decoded) {
            return null;
        }
        return decoded;
    }

    getRefreshToken() {
        return window.localStorage.getItem('refresh_token');        
    }
}