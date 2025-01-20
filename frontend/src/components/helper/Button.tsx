import React from 'react'
import { Button } from '@mui/material';

interface ButtonProps {
    text: string,
    // color?: string,  
    height?: string,
    width?: string,
    tooltip?: string
    onClick?:()=>void
}
const TextButton: React.FC<ButtonProps> = (props) => {
    const { text } = props;
  return (
        <>
            <Button
                // height={height}
                // width={width}
                // tooltip={tooltip}
                sx={{...props}}
                // onClick={onClick}
            >
                {text}
            </Button>
        </>
    )
}

export default TextButton