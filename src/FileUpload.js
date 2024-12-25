import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
  AppBar,
  Toolbar,
} from '@mui/material';

const DragAndDropBox = ({ isDragging, onDragOver, onDragLeave, onDrop, children }) => (
  <Box
    sx={{
      border: isDragging ? '2px dashed #633F33' : '2px dashed #CCC',
      padding: 4,
      borderRadius: 2,
      backgroundColor: isDragging ? '#F5E7E3' : '#FFF',
      textAlign: 'center',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    {children}
  </Box>
);

const FileUploadPage = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const [result, setResult] = useState(null);

  const handleDragOver = (e, setIsDragging) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (setIsDragging) => {
    setIsDragging(false);
  };

  const handleDrop = (e, setFile, setIsDragging) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileSelect = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    setResult('Files received successfully!');
  };

  const handleCancel = () => {
    setFile1(null);
    setFile2(null);
    setResult(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#DBC1AA',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#633F33' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BIRADS
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ maxWidth: 800, margin: 'auto', padding: 2, flexGrow: 1 }}>
        {/* Drag-and-Drop Boxes */}
        <Grid container spacing={6} alignItems="center">
          {/* First Drag-and-Drop Box */}
          <Grid item xs={6}>
            <DragAndDropBox
              isDragging={isDragging1}
              onDragOver={(e) => handleDragOver(e, setIsDragging1)}
              onDragLeave={() => handleDragLeave(setIsDragging1)}
              onDrop={(e) => handleDrop(e, setFile1, setIsDragging1)}
            >
              {!file1 ? (
                <Typography variant="body1">
                  Drag and drop your JPEG file here, or click the button below to choose JPEG file.
                </Typography>
              ) : (
                <Typography variant="body2" color="primary">
                  Selected file: {file1.name}
                </Typography>
              )}
            </DragAndDropBox>

            {/* File Select Button */}
            <Box mt={2}>
              <input
                type="file"
                id="file-input-1"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e, setFile1)}
              />
              <label htmlFor="file-input-1">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#633F33',
                    '&:hover': {
                      backgroundColor: '#80594B',
                    },
                  }}
                  component="span"
                >
                  Choose  JPEG
                </Button>
              </label>
            </Box>
          </Grid>

          {/* Second Drag-and-Drop Box */}
          <Grid item xs={6}>
            <DragAndDropBox
              isDragging={isDragging2}
              onDragOver={(e) => handleDragOver(e, setIsDragging2)}
              onDragLeave={() => handleDragLeave(setIsDragging2)}
              onDrop={(e) => handleDrop(e, setFile2, setIsDragging2)}
            >
              {!file2 ? (
                <Typography variant="body1">
                  Drag and drop your JSON file here, or click the button below to choose JSON file.
                </Typography>
              ) : (
                <Typography variant="body2" color="primary">
                  Selected file: {file2.name}
                </Typography>
              )}
            </DragAndDropBox>

            {/* File Select Button */}
            <Box mt={2}>
              <input
                type="file"
                id="file-input-2"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e, setFile2)}
              />
              <label htmlFor="file-input-2">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#633F33',
                    '&:hover': {
                      backgroundColor: '#80594B',
                    },
                  }}
                  component="span"
                >
                  Choose JSON
                </Button>
              </label>
            </Box>
          </Grid>
        </Grid>

        {/* Submit and Cancel Buttons */}
        <Grid container spacing={30} justifyContent="center" mt={4}>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#633F33',
                '&:hover': {
                  backgroundColor: '#80594B',
                },
              }}
              onClick={handleSubmit}
              disabled={!file1 || !file2}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#633F33',
                color: '#633F33',
                '&:hover': {
                  borderColor: '#80594B',
                  color: '#80594B',
                },
              }}
              onClick={handleCancel}
              disabled={!file1 && !file2}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

        {/* Result Box */}
        {result && (
          <Box
            mt={4}
            sx={{
              backgroundColor: '#FFF',
              color: '#000',
              padding: 3,
              borderRadius: 2,
              border: '1px solid #CCC',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{result}</Typography>
            <Typography variant="body2" mt={1}>
              {/* JPEG File: {file1 ? file1.name : 'None'} <br />
              JSON File: {file2 ? file2.name : 'None'} */}
            </Typography>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#633F33',
          color: '#fff',
          padding: 3,
          textAlign: 'center',
          marginTop: 'auto',
        }}
      >
        <Typography variant="body2" paragraph>
          BI-RADS: Breast Imaging Reporting and Data System.
        </Typography>
      </Box>
    </Box>
  );
};

export default FileUploadPage;