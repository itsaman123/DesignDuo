import {useState} from 'react'
import {Box, Button, TextField} from "@mui/material"
// import TextButton from './helper/Button'
const UploadFile = () => {
  const [files, setFiles]=useState<File[]>([]);

  const handleUpload=()=>{
    const formData=new FormData();
    for(const file in files){
      formData.append("files", file as unknown as File )

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data=Object.fromEntries(formData)
    console.log(data);
  }




  return (
    <Box>
      <TextField 
        placeholder="Please Upload File"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e:any)=>{
          e.preventDefault();
          setFiles(e.target.files[0]);
        }}
        type="file"
      />
      {/* <TextButton
        text={"Upload"}
        // onClick={handleClick}
      /> */}
      <Button variant='contained' onClick={handleUpload}>Upload</Button>
      
    
    </Box>
  )
}

export default UploadFile