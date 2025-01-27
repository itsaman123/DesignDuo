/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const instance: any = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' }
});

const genericError = {
    message: 'Something went wrong',
    status: 500
};

function defaultCatch(error: any, resolve: any) {
    if (error.response) {
        resolve(error.response);
    } else {
        resolve(genericError);
    }
}

export default class Auth {
    static login(values: any) {
        return new Promise((resolve) => {
            instance
                .post('user/v1/login', values.userData) // Pass `values` directly
                .then(function (response: unknown) {
                    resolve(response);
                })
                .catch(function (error: unknown) {
                    defaultCatch(error, resolve);
                });
        });
    }

    static register(values: any) {
        return new Promise((resolve: any) => {
            instance
                .post('user/v1/register', values.userData) // Pass `values` directly
                .then(function (response: any) {
                    resolve(response);
                })
                .catch(function (error: any) {
                    defaultCatch(error, resolve);
                });
        });
    }
}
