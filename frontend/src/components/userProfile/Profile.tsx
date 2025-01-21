import { Stack, Box, Typography } from "@mui/material";
// import { useStyles } from "@mui/styles";
// import style from '/style.css'
const Profile = () => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    // background:theme.palette.primary.main;
                    background: 'black',
                    height: '6rem',
                    marginTop: '0',
                    padding: '0'

                }}>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    background: '#d81313',
                    width: '70%',
                    height: '9rem',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems:'center'
                }}>

                <Stack
                >
                    <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates qui alias, eius officiis, dolores cupiditate, laboriosam illo in ex numquam cum deleniti accusantium recusandae. Harum, quam iste consectetur quaerat obcaecati aliquid veniam dolore consequuntur cupiditate earum quas reiciendis neque dolorem illo ad nobis alias magni explicabo unde vitae quos blanditiis.</Typography>
                </Stack>
            </Box>

        </>
    )
}

export default Profile