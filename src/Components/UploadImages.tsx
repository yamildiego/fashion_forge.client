import { useState } from "react";
import Dropzone from "react-dropzone";
import { Stack, Typography, Grid, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadImages = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles: any) => {
    // @ts-ignore
    setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (fileIndex: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Typography variant="h6" gutterBottom>
        Upload multiple images
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()} style={{ ...styles.dropzone, ...(isDragActive ? { ...styles.dropzoneActive } : {}) }}>
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <Typography variant="body1">Drag and drop your images here or click to select files</Typography>
              </div>
            )}
          </Dropzone>
        </Grid>
        <Grid item xs={12} sm={6}>
          {files.length > 0 && (
            <Typography variant="h6" gutterBottom>
              Selected images:
            </Typography>
          )}
          {files.map((file: any, index: number) => (
            <div key={index}>
              <Typography variant="body1">{file.name}</Typography>
              <Button variant="contained" color="secondary" onClick={() => removeFile(index)}>
                Delete
              </Button>
            </div>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
};

const styles = {
  container: {
    // justifyContent: "flex-start",
    // alignItems: "center",
    // mt: 4,
  },
  dropzone: {
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#eee",
    cursor: "pointer",
  },
  dropzoneActive: {
    backgroundColor: "#ddd",
  },
};

export default UploadImages;

// padding: "",
// // border: `2px dashed ${theme.palette.primary.main}`,
// // borderRadius: theme.shape.borderRadius,
