const API_KEY = 'apiKey';
const USER_ID = 'userId';
const REMEMBER_ME = 'rememberMe';

class UserStorage
{
    static get apiKey() {
        return window[UserStorage.storageName].getItem(API_KEY);
    }

    static set apiKey(newApiKey) {
        if (undefined !== newApiKey && null !== newApiKey) {
            window[UserStorage.storageName].setItem(API_KEY, newApiKey);
        }
    }

    static get userId() {
        return window[UserStorage.storageName].getItem(USER_ID);
    }

    static set userId(newUserId) {
        if (undefined !== newUserId && null !== newUserId) {
            window[UserStorage.storageName].setItem(USER_ID, newUserId);
        }
    }

    static get rememberMe() {
        return window.localStorage.getItem(REMEMBER_ME);
    }

    static set rememberMe(remember) {
        window.localStorage.setItem(REMEMBER_ME, remember ? '1' : '');
    }

    static get storageName() {
        return UserStorage.rememberMe ? 'localStorage' : 'sessionStorage';
    }

    static loggedIn = () => {
        return null !== UserStorage.apiKey;
    };
}

export default UserStorage;
