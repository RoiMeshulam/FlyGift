import React, { useState, useEffect, useRef } from "react";
import { Icon, Box, Typography } from '@mui/material';

const NavItem = (props) => {
    const [fontSize, setFontSize] = useState(100);
    const [originalFontSize, setOriginalFontSize] = useState(100);
    const targetRef = useRef(null);
    const { icon: IconComponent, text } = props;

    useEffect(() => {
        function handleMouseEnter() {
          setFontSize(135);
        }

        
        function handleMouseLeave() {
            setFontSize(originalFontSize);
        }
        
        const target = targetRef.current;
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
    
        return () => {
          target.removeEventListener("mouseenter", handleMouseEnter);
          target.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

  return (
    <Box 
        display="flex" 
        flexDirection="column"
        alignItems="center" 
        height={140}
        onClick={props.onClick}
        >
        <IconComponent  ref={targetRef} sx={{fontSize: `${fontSize}px`,
          transition: "font-size 0.3s ease-in-out"}} />
        <Typography variant="body1" fontSize={'24px'} textAlign={'center'}>{text}</Typography>
    </Box>
    
    
    
  )
}

export default NavItem