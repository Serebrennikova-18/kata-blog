/* eslint-disable import/prefer-default-export */
import Service from '../../service/Service';

import {
    loadArticles,
    loadfullArticle,
    changingPage,
    signIn,
    signUp,
    logOut,
    createArticle,
    createAccount,
    editAccount,
    newArticle,
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

function getArticles(payload) {
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

function getFullArticle(payload) {
    return {
        type: loadfullArticle,
        payload,
    };
}

export function asyncGetFullArticle(slug) {
    return (dispatch) => {
        getInfo
            .getFullArticle(slug)
            .then((body) => {
                dispatch(getFullArticle(body));
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

function addArticle(payload) {
    return {
        type: newArticle,
        payload,
    };
}

export function asyncAddArticle(data, token, tags) {
    return (dispatch) => {
        getInfo
            .createArticle(data, token, tags)
            .then((body) => {
                dispatch(addArticle(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}
