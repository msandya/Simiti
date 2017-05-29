class AuthService {
    constructor() {
        this.allowedOrigins = [];
        this.loginEndpoint = null;
        this.logoutEndpoint = null;
        this.registerEndpoint = null;
        this.appRedirect = () => null;
        this.authenticatedCallbacks = [];
        this.signedOutCallbacks = [];

        window.addEventListener("message", (e) => this.onMessage(e), false);
    }

    get identity() {
        return ITI.simiti.getIdentity();
    }

    set identity(i) {
        ITI.simiti.setIdentity(i);
    }

    get isConnected() {
        return this.identity != null;
    }

    get accessToken() {
        var identity = this.identity;

        return identity ? identity.bearer.access_token : null;
    }

    emailUser() {
        var identity = this.identity;
        return (identity.email);
    }

    get email() {
        var identity = this.identity;

        return identity ? identity.email : null;
    }

    get userInfor(){
        return identity;
    }

    get boundProviders() {
        var identity = this.identity;

        return identity ? identity.boundProviders : [];
    }
    
    isBoundToProvider(expectedProviders) {
        var isBound = false;

        for(var p of expectedProviders) {
            if(this.boundProviders.indexOf(p) > -1) isBound = true;
        }

        return isBound;
    }

    onMessage(e) {
        console.log('Is url allowed ?', !(!e.origin || this.allowedOrigins.indexOf(e.origin) < 0));
        if(!e.origin || this.allowedOrigins.indexOf(e.origin) < 0) return;

        var data = typeof e.data == 'string' ? JSON.parse(e.data) : e.data;
        console.log('onMessage()');
        if(data.type == 'authenticated') {
            console.log('authenticated');
            this.onAuthenticated(data.payload);
        } else if(data.type == 'signedOut') {
            console.log('signedOut');
            this.onSignedOut();
        }
    }

    login() {
        var popup = window.open(this.loginEndpoint, "Connexion à Simiti", "menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=700");
    }

    logout() {
        var popup = window.open(this.logoutEndpoint, "Déconnexion de Simiti", "menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=600");        
    }

    register(){
        var popup = window.open(this.registerEndpoint, "S'inscrire à Simiti", "menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=600");
    }

    registerAuthenticatedCallback(cb) {
        this.authenticatedCallbacks.push(cb);
    }

    removeAuthenticatedCallback(cb) {
        this.authenticatedCallbacks.splice(this.authenticatedCallbacks.indexOf(cb), 1);
    }

    onAuthenticated(i) {
        this.identity = i;

        for(var cb of this.authenticatedCallbacks) {
            cb();
        }
    }
    registerSignedOutCallback(cb) {
        this.signedOutCallbacks.push(cb);
    }

    removeSignedOutCallback(cb) {
        this.signedOutCallbacks.splice(this.signedOutCallbacks.indexOf(cb), 1);
    }

    onSignedOut() {
        this.identity = null;

        for(var cb of this.signedOutCallbacks) {
            cb();
        }
    }
}

export default new AuthService();