import { useState } from 'react'
import { Stack, Typography, Button, TextField } from '@mui/material';
import Auth from '../api/user';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../components/helper/Toast';
const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = () => {
        if (email.length <= 0) {
            showToast('error', `Email is required`);
            return;
        }
        else if (password.length <= 0) {
            showToast('error', `Password is required`);
            return;
        }
        const data = {
            email,
            password
        }
        Auth.login({
            ...Headers,
            userData: data
        })            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    showToast('success', "Login completed")
                }
                else {
                    showToast('error', `Something went wrong`);

                }
            })
    }
    return (
        <>
            <Stack
                sx={style.StackContainer}
            >
                <>
                    <Typography variant='h4'>Login</Typography>
                </>
                <Stack direction="column" spacing={2} width="20rem">

                    <TextField
                        placeholder='Enter Email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                    />
                    <TextField
                        placeholder='Enter Password'
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <span>
                        Don't have an account? <Link to={"/register"}> Register here</Link>
                    </span>

                    <Button variant='outlined' onClick={handleSubmit}>Login</Button>
                </Stack>

            </Stack>
            <Toaster />
        </>
    )
}

export default Login

const style = {
    StackContainer: {
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: '130px',
    }
}