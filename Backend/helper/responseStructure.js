const mute=require('immutable');
const responseStruct=mute.Map({
    signature:null,
    success:null,
    message:'',
    type:'',
    action:null,
    data:null,
    metadata:null,
    status:null
})
module.exports=responseStruct