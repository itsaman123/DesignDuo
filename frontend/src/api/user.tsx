/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const instance:any=axios.create({
    baseURL:'http://localhost:3000/',
    headers:{'Content-Type':'application/json'}
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const instance1:any={
    baseURL:'http://localhost:3000/',
    headers:{'Content-Type':'multipart/form-data'}
}

const genericError={
    message:'Something went wrong',
    status:500
}

function defaultCatch(error:any, resolve:any){
    if(error.response){
        resolve(error.response);
    }
    else{
        resolve(genericError)
    }
}

export default class Auth{
    static login(values:unknown){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload:any=values;
        console.log(payload)
        return new Promise((resolve)=>{
            instance
            .post('users/v1/login', payload.data)
            .then(function (response: unknown){
                resolve(response)
            })
            .catch(function(error:unknown){
                defaultCatch(error, resolve);
            })
        })
    }

    static register(values:any){
        const payload=values;
        return new Promise((resolve:any)=>{
            instance
            .post('users/v1/register', payload.data)
            .then(function (response:any){
                resolve(response);
            })
            .catch(function (error:any){
                defaultCatch(error, resolve)
            })
        })
    }
}