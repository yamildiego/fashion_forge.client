import { ChangeEvent, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropzone from "react-dropzone";
import { Typography, Grid, Button } from "@mui/material";

import { Stack, TextField, FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import FormView from "../FormView";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as jobActions from "../../Actions/jobActions";

import TypesOfClothing from "../../TypesOfClothing.json";

interface JobsProps {
  formNewJob: FormJobType;
  setFormNewJob: (view: FormJobType) => void;
  newJob: (job: JobType) => void;
}

const Jobs = (props: JobsProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formNewJob } = props;

  const [files, setFiles] = useState([]);

  // const handleDrop = (acceptedFiles: any) => {
  //   // @ts-ignore
  //   setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
  // };

  // const removeFile = (fileIndex: number) => {
  //   setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  // };

  const handleOnChange = (value: FormJobType) => {
    if (submitted) props.setFormNewJob(runValidation(value));
    else props.setFormNewJob(value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);
    let formValidated = runValidation(formNewJob);
    props.setFormNewJob(formValidated);
    let hasError = Object.values(formValidated).some((field) => field.error);
    let jobFormatted = Object.entries(formValidated).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {} as JobType);

    if (!hasError) props.newJob(jobFormatted);
  };

  const runValidation = (formNew: FormJobType) => {
    let formValidated: FormJobType = {
      type_of_clothing: genericValidation(formNew.type_of_clothing.value, "required", "Type of clothing"),
      description: genericValidation(formNew.description.value, "required", "Description"),
      budget: genericValidation("", "", "Budget"),
    };

    return formValidated;
  };

  return (
    <FormView title="New job" submitText="Create job" handleSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label" sx={{ backgroundColor: "white" }}>
              Type of clothing
            </InputLabel>
            <Select
              error={submitted && formNewJob.type_of_clothing.error}
              value={formNewJob.type_of_clothing.value}
              onChange={(event: SelectChangeEvent<string>) => {
                handleOnChange({ ...formNewJob, type_of_clothing: { ...formNewJob.type_of_clothing, value: event.target?.value || "" } });
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              {Object.keys(TypesOfClothing).map((cloth: string) => {
                return <MenuItem value={cloth}>{TypesOfClothing[cloth as TypeOfClothing]}</MenuItem>;
              })}
            </Select>
            {submitted && formNewJob.type_of_clothing.error && (
              <FormHelperText error>{formNewJob.type_of_clothing.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formNewJob.description.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formNewJob, description: { ...formNewJob.description, value: event.target.value } })
            }
            error={formNewJob.description.error && submitted}
            helperText={submitted && formNewJob.description.error ? formNewJob.description.helperText : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            id="budget"
            name="budget"
            label="Budget"
            fullWidth
            value={formNewJob.budget.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formNewJob, budget: { ...formNewJob.budget, value: event.target.value } })
            }
            error={formNewJob.budget.error && submitted}
            helperText={submitted && formNewJob.budget.error ? formNewJob.budget.helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </FormView>
  );
};

const styles = {
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 4,
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

const mapStateToProps = (state: StateType) => {
  return {
    formNewJob: state.jobReducer.formNewJob,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewJob: jobActions.setFormNewJob,
  newJob: jobActions.newJob,
};

export default withParamsAndNavigate(Jobs, mapStateToProps, mapDispatchToProps);

// padding: "",
// // border: `2px dashed ${theme.palette.primary.main}`,
// // borderRadius: theme.shape.borderRadius,

// <Stack spacing={2} direction="column" sx={styles.container}>
//       <>
//         <Typography variant="h6" gutterBottom>
//           Upload multiple images
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Dropzone onDrop={handleDrop}>
//               {({ getRootProps, getInputProps, isDragActive }) => (
//                 <div {...getRootProps()} style={{ ...styles.dropzone, ...(isDragActive ? { ...styles.dropzoneActive } : {}) }}>
//                   <input {...getInputProps()} />
//                   <CloudUploadIcon fontSize="large" />
//                   <Typography variant="body1">Drag and drop your images here or click to select files</Typography>
//                 </div>
//               )}
//             </Dropzone>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             {files.length > 0 && (
//               <Typography variant="h6" gutterBottom>
//                 Selected images:
//               </Typography>
//             )}
//             {files.map((file: any, index) => (
//               <div key={index}>
//                 <Typography variant="body1">{file.name}</Typography>
//                 <Button variant="contained" color="secondary" onClick={() => removeFile(index)}>
//                   Delete
//                 </Button>
//               </div>
//             ))}
//           </Grid>
//         </Grid>
//       </>
//     </Stack>
