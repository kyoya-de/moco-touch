import UserStorage from "./Storage";
import Utils from "./Utils";

class MocoApi
{
    static baseUrl = '';

    static set domain(newDomain) {
        MocoApi.baseUrl = `https://${newDomain}.mocoapp.com/api/v1`
    }

    static login = (email, password, rememberMe) => {
        return new Promise((resolve, reject) => {
            fetch(
                `${MocoApi.baseUrl}/session`,
                {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json',
                    },
                    body: JSON.stringify({email, password})
                }
                )
                .then(response => response.json().then(json => {
                    if (200 !== response.status) {
                        reject(json.message);
                        return;
                    }

                    UserStorage.rememberMe = rememberMe;
                    UserStorage.apiKey = json.api_key;
                    UserStorage.userId = json.user_id;
                    resolve(json);
                }));
        });
    };

    static presences = () => {
        return new Promise(
            (resolve, reject) => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                const url = `${MocoApi.baseUrl}/users/presences?` +
                    `from=${Utils.formatDate(yesterday)}&` +
                    `to=${Utils.formatDate(new Date())}&` +
                    `user_id=${UserStorage.userId}`;

                fetch(
                    url,
                    {
                        method: 'GET',
                        cache: 'no-cache',
                        headers: {
                            "Accept": 'application/json',
                            'Authorization': `Token token=${UserStorage.apiKey}`
                    }})
                    .then(response => {
                        response.json().then(json => {
                            if (200 !== response.status) {
                                reject(json.message);
                                return;
                            }

                            resolve(json);
                        });
                    });
            }
        )
    };

    static touch = () => {
        return new Promise((resolve, reject) => {
            fetch(
                `${MocoApi.baseUrl}/users/presences/touch`,
                {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        "Accept": 'application/json',
                        'Authorization': `Token token=${UserStorage.apiKey}`
                    }})
                .then(response => {
                    if (200 === response.status) {
                        resolve();
                    } else {
                        response.json().then(json => {
                            reject(json.message);
                        });
                    }
                });

        });
    };
}

export default MocoApi;
