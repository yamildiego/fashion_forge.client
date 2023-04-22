import { ChangeEvent, useState } from "react";
import { Grid, TextField, FormHelperText, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as clientActions from "../../Actions/clientActions";

import FormView from "../Common/FormView";

import TypesOfClothing from "../../TypesOfClothing.json";

interface JobsProps {
  formNewJob: FormJobType;
  setFormNewJob: (view: FormJobType) => void;
  newJob: (job: JobType) => void;
}

const Jobs = (props: JobsProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formNewJob } = props;

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
      budget: genericValidation(formNew.budget.value, "", "Budget"),
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
        <Grid item xs={12}>
          {/* <UploadImages /> */}
        </Grid>
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    formNewJob: state.clientReducer.formNewJob,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewJob: clientActions.setFormNewJob,
  newJob: clientActions.newJob,
};

export default withParamsAndNavigate(Jobs, mapStateToProps, mapDispatchToProps);
