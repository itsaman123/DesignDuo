import { useState } from 'react'
import { Stack, Typography, Button, TextField } from '@mui/material';
import Auth from '../api/user';
import { Link } from 'react-router-dom';
import { showToast } from '../components/helper/Toast'
import { Toaster } from 'react-hot-toast';
const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = () => {
        if (name.length <= 0) {
            showToast('error', `name is required`);
            return;
        }
        else if (email.length <= 0) {
            showToast('error', `email is required`);
            return;
        }
        else if (password.length <= 0) {
            showToast('error', `password is required`);
            return;
        }
        const data = {
            name,
            email,
            password
        }
        console.log(data);
        Auth.register({
            ...Headers,
            userData: data
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    showToast('error', "data added")
                }
                else {
                    showToast('error', "Something went wrong")
                }
            })
    }
    return (
        <>
            <Stack
                sx={style.StackContainer}
            >
                <>
                    <Typography variant='h4'>Register</Typography>
                </>
                <Stack direction="column" spacing={2} width="20rem">
                    <TextField
                        placeholder='Enter Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
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

                        Already have an account?<Link to={"/login"}> Login here</Link>
                    </span>

                    <Button variant='outlined' onClick={handleSubmit}>Register</Button>
                </Stack>
                <Toaster />

            </Stack>
        </>
    )
}

export default Register


const style = {
    StackContainer: {
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: '130px',
    }
}