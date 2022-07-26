/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "8448ce9f-6978-48b5-94c9-042e67bb8048",
        authority: "https://login.microsoftonline.com/4029eb38-8689-465c-92e1-9464066c814c",
        redirectUri: "http://localhost:3000"
        //redirectUri: "https://myreactstorage001.z11.web.core.windows.net/"        
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    //scopes: ["User.Read"]    
    scopes: [
        "api://8448ce9f-6978-48b5-94c9-042e67bb8048/test"
    //     "api://8448ce9f-6978-48b5-94c9-042e67bb8048/test2"        
    ]
    //存在しないScopeを指定するとログイン時にエラーになる
    //scopeが無効のときはOK...
    /*
        ServerError: invalid_client: AADSTS65005: 
        The application '8448ce9f-6978-48b5-94c9-042e67bb8048' 
        asked for scope 'test2' that doesn't exist.    
    */
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
