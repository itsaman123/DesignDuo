type EnvironmentI={
    local:{
        env:string,
        USER_URL:string
    },
    production:{
        env:string,
        USER_URL:string

    }
}

const _Environment:EnvironmentI={
    local:{
        env:'local',
        USER_URL:'http://localhost:3000'
    },
    production:{
        env: 'production',
        USER_URL:'http://localhost:3000'
    }
}
const getEnvironment=()=>{
    let env: keyof EnvironmentI='local';
    if(window.location.href.includes('local')){
        env='local';
    }
    return _Environment[env];
}

const Environment=getEnvironment();
export default Environment;