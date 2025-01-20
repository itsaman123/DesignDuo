import React,{useState} from 'react'
import {Box, Stack, Typography, Button, TextField} from '@mui/material';
// import {Link} from 'react-router-dom';
import Auth from '../api/user';
const Register = () => {
    const [name, setName]=useState<string>('');
    const [email, setEmail]=useState<string>('');
    const [password, setPassword]=useState<string>('');

    const handleSubmit=()=>{
        if(name.length<=0){
            alert(`name is required`);
            return;
        }
        else if(email.length<=0){
            alert(`email is required`);
            return;
        }
        else if(password.length<=0){
            alert(`password is required`);
            return;
        }
        const data={
            name,
            email,
            password
        }
        console.log(data);
        Auth.register({
            ...Headers,
            userData:data
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res:any)=>{
            console.log(res);
            if(res.status===200){
                alert("data added")
            }
            else{
                alert("Error")
            }
        })


    }
  return (
    <>
    <Stack>
        <Stack>
            <Box>
                <Typography>Please</Typography>
                <Typography>Login/Register</Typography>
            </Box>
        </Stack>
        <Stack direction="column" spacing={2} width="20rem">
            {/* <Box> */}
                <TextField 
                    placeholder='Enter Name'
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                />
                <TextField 
                    placeholder='Enter Email'
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                />
                <TextField 
                    placeholder='Enter Password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
            {/* </Box> */}

        <Button variant='outlined' onClick={handleSubmit}>Register</Button>
        </Stack>

    </Stack>
    </>
  )
}

export default Register