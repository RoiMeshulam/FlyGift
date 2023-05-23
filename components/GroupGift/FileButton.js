import React, { useRef } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';

const GreyButton = styled(Button)({
    background: grey[500]
});

const FileButton = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <>
      <input
        type="file"
        id="csvFileInput"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      <GreyButton size={'Large'} variant="contained" onClick={handleFileSelect}>csv טעינה באמצעות קובץ</GreyButton>
    </>
  );
};

export default FileButton;