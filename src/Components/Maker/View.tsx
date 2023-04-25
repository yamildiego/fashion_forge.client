import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { Grid, TextField, FormHelperText, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import FormView from "../Common/FormView";

import TypesOfClothing from "../../TypesOfClothing.json";

import ModalQuote from "../ModalQuote";

interface ViewProps {
  job: JobType;
  user: UserType;
}

const View = (props: ViewProps) => {
  const { job, user } = props;
  const wasQuoted = job.quotes && job.quotes.some((x) => x.user_id == user.id);

  return (
    <>
      <FormView title="Job infotmation" handleSubmit={() => {}}>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid item xs={12}>
            User details
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField disabled id="name" name="name" label="Name" fullWidth value={job?.user?.name ?? ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField disabled id="lastname" name="lastname" label="Last Name" fullWidth value={job?.user?.lastname ?? ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField disabled id="email" name="email" label="Email" fullWidth value={job?.user?.email ?? ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField disabled id="phone" name="phone" label="Phone Number" fullWidth value={job?.user?.phone ?? ""} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth disabled label="Address" id="address_line_1" value={job?.user?.phone ?? ""} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="State" disabled placeholder="State" value={job?.user?.state ?? ""} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Postal Code" disabled placeholder="Postal Code" value={job?.user?.postcode ?? ""} />
          </Grid>
          <Grid item xs={12}>
            Job details
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              id="type_of_clothing"
              name="type_of_clothing"
              label="Type of clothing"
              fullWidth
              value={TypesOfClothing[job.type_of_clothing]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={job.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField disabled type="number" id="budget" name="budget" label="Budget" fullWidth value={job.budget} />
          </Grid>
          {!wasQuoted && (
            <Grid item xs={12}>
              <ModalQuote job={job} />
            </Grid>
          )}
        </Grid>
      </FormView>
    </>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    user: state.appReducer.user,
    job: state.makerReducer.job,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {};

export default withParamsAndNavigate(View, mapStateToProps, mapDispatchToProps);
