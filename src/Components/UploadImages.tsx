import { useState } from "react";
import Dropzone from "react-dropzone";
import { Stack, Typography, Grid, Button, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import * as imageActions from "../Actions/imageActions";

import defaultImage from "../Assets/nopreview.png";

import Urls from "../Constants/Urls";

interface UploadImagesProps {
  user: UserType;
  images: ImageType[];
  uploadImages: (images: ImageType[], formData: FormData) => void;
  addImages: (images: ImageType[]) => void;
  removeImage: (id: number) => void;
}

const UploadImages = (props: UploadImagesProps) => {
  const { user, images, addImages, uploadImages, removeImage } = props;
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles: any) => {
    // @ts-ignore
    addImages(acceptedFiles);

    const formData = new FormData();
    acceptedFiles.forEach((file: any) => {
      formData.append("images", file);
    });

    uploadImages(acceptedFiles, formData);
  };

  const removeFile = (id: number) => removeImage(id);

  return (
    <Stack spacing={2} direction="column">
      <Typography variant="h6" gutterBottom>
        Upload multiple images
      </Typography>
      <Grid container spacing={2} sx={{ padding: 0, margin: 0 }}>
        <Grid item xs={12} sm={6} sx={{ padding: "0!important", margin: "0!important" }}>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()} style={{ ...styles.dropzone, ...(isDragActive ? { ...styles.dropzoneActive } : {}) }}>
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <Typography variant="body1">Drag and drop your images here or click to select files. PNG/JPG Limit 4mb</Typography>
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
          {images.map((image: ImageType, index: number) => (
            <div key={index}>
              {!image.error && (
                <Avatar
                  alt="User Avatar"
                  src={`${Urls.baseUrl}/uploads/${image?.id ? image.path : `${user.id}_${image.path}`}` || defaultImage}
                />
              )}
              <Typography variant="body1">{image.path}</Typography>
              <Typography variant="body1" color="error">
                {image.error}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => removeFile(image?.index ?? 0)}>
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

const mapStateToProps = (state: StateType) => {
  return {
    user: state.appReducer.user,
    images: state.imageReducer.images,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  uploadImages: imageActions.uploadImages,
  addImages: imageActions.addImages,
  removeImage: imageActions.removeImage,
};

export default withParamsAndNavigate(UploadImages, mapStateToProps, mapDispatchToProps);
