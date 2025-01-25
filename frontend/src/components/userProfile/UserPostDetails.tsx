import { Stack, Typography } from "@mui/material";

const UserPostDetails = () => {
    const { posts, comments, followers } = { posts: 5, comments: 2, followers: 91 };
    return (
        <>
            <Stack
                sx={{
                    position:'absolute',
                    left:'100px'
                }}
                >
                <Stack
                    sx={{
                        backgroundColor: '#FFFFFF',
                        marginTop: '200px',
                        width: '500px',
                        height: '300px',
                        padding:'40px',

                    }}
                >
                    <Typography>
                        {posts} Posts published
                    </Typography>
                    <Typography>
                        {comments} Comments written
                    </Typography>
                    <Typography>
                        {followers} Followers
                    </Typography>

                </Stack>
            </Stack>
        </>
    )
}

export default UserPostDetails