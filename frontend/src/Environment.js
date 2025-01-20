

const _Environment={
    local:{
        env:'local',
        USER_URL:'http://localhost:3000'
    }
}
const getEnvironment=()=>{
    let env='';
    if(window.location.href.includes('local')){
        env='local';
    }
    return _Environment[env];
}

const Environment=getEnvironment();
module.exports=Environment;