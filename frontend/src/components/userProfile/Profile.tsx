import { useState } from "react";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import "./style.css";
import Navbar from "../Navbar";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("Developer");
    const [name, setName] = useState("name");
    const [image, setImage] = useState(
        "https://img.freepik.com/free-vector/gradient-communication-design-template_23-2149839561.jpg?t=st=1737431242~exp=1737434842~hmac=6513dfbe41ba62fc0836abbf4dd73d8dbf2bd74c9d1d27b36d4b4a35e359cf0a&w=740"
    );

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBio(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <Navbar />
            <Box
                sx={{
                    width: "100%",
                    background: "black",
                    height: "14rem",
                    position: "relative",
                }}
            ></Box>
            <Box
                sx={{
                    display: "flex",
                    background: "#FFFFFF",
                    width: "80%",
                    height: "14rem",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    position: "absolute",
                    top: "140px",
                    left: "100px",
                }}
            >
                <Stack
                    sx={{
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        {/* Edit Button */}
                        <Button
                            variant="contained"
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 20,
                                minWidth: "auto",

                            }}
                            onClick={toggleEdit}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                        {isEditing && (

                            <Button
                                variant="outlined"

                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 100,
                                    minWidth: "auto",

                                }}
                                onClick={() => {
                                    setIsEditing(false)
                                }}
                            >
                                Cancel
                            </Button>
                        )}

                        {/* Profile Image */}
                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-block",
                                borderRadius: "50%",
                                overflow: "hidden",
                                width: "100px",
                                height: "100px",
                                margin: "0 auto",
                            }}
                        >
                            <img
                                src={image}
                                alt="Profile"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            {isEditing && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        width: "100%",
                                        background: "rgba(0, 0, 0, 0.6)",
                                        color: "#fff",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <label htmlFor="upload-image">
                                        <Typography
                                            variant="caption"
                                            sx={{ cursor: "pointer" }}
                                        >
                                            Change Image
                                        </Typography>
                                    </label>

                                    <input
                                        id="upload-image"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Editable Bio */}
                        {isEditing ? (
                            <>
                                <TextField
                                    value={name}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        marginTop: "2rem",
                                        backgroundColor: "#fff",
                                    }}
                                />
                                <TextField
                                    value={bio}
                                    onChange={handleBioChange}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        marginTop: "2rem",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Typography sx={{ marginTop: "1rem" }}>
                                    Name
                                </Typography>
                                <Typography sx={{ marginTop: "1rem" }}>
                                    Bio ({bio})
                                </Typography>
                            </>
                        )}
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default Profile;
