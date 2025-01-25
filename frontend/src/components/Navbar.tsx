import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'
import { InputBase, Button } from '@mui/material';
const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#FFFFFF' }}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <img src="https://img.freepik.com/free-vector/gradient-communication-design-template_23-2149839561.jpg?t=st=1737431242~exp=1737434842~hmac=6513dfbe41ba62fc0836abbf4dd73d8dbf2bd74c9d1d27b36d4b4a35e359cf0a&w=740" alt="logo" height={"80px"} />
                    <InputBase
                        sx={{ ml: 1, flex: 1, maxWidth: '300px', border: '1px solid black', borderRadius: '4px', padding: '5px' }}
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'Search Posts' }}
                    />
                    <Button variant='contained'>
                        Create Post
                    </Button>



                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar