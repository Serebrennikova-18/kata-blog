/* eslint-disable import/prefer-default-export */
import Service from '../../service/Service';

import {
    loadArticles,
    changingPage,
    signIn,
    signUp,
    logOut,
    createArticle,
    createAccount,
    editAccount,
} from './types';

const getInfo = new Service();

export function accountLogin() {
    return {
        type: signIn,
    };
}

export function accountCreate() {
    return {
        type: signUp,
    };
}

export function accountLoginOut() {
    sessionStorage.removeItem('user');
    return {
        type: logOut,
    };
}

export function articleCreate() {
    return {
        type: createArticle,
    };
}

export function getArticles(payload) {
    return {
        type: loadArticles,
        payload,
    };
}
export function asyncGetArticles(page) {
    return (dispatch) => {
        getInfo
            .getArticles(page)
            .then((body) => {
                dispatch(getArticles(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function changePage(payload) {
    return {
        type: changingPage,
        payload,
    };
}

function createUser(payload) {
    return {
        type: createAccount,
        payload,
    };
}

export function asyncCreateUser(data) {
    return (dispatch) => {
        getInfo
            .postUser(data)
            .then((body) => {
                sessionStorage.setItem('user', JSON.stringify(body));
                dispatch(createUser(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

function logIn(payload) {
    return {
        type: createAccount,
        payload,
    };
}

export function asyncLodIn(data) {
    return (dispatch) => {
        getInfo
            .userLogin(data)
            .then((body) => {
                sessionStorage.setItem('user', JSON.stringify(body));
                dispatch(logIn(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

function editProfile(payload) {
    return {
        type: editAccount,
        payload,
    };
}

export function asyncEditProfile(data, token) {
    return (dispatch) => {
        getInfo
            .updateUser(data, token)
            .then((body) => {
                sessionStorage.setItem('user', JSON.stringify(body));
                dispatch(editProfile(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}
