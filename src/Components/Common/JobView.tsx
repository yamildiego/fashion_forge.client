import { Grid, TextField, Box } from "@mui/material";

import TypesOfClothing from "../../TypesOfClothing.json";

import Status from "../Common/Status";

interface JobViewProps {
  job: JobType;
  user?: UserType;
}

const JobView = (props: JobViewProps) => {
  const { job, user = null } = props;

  let wasQuoted: boolean = false;
  if (user !== null) wasQuoted = job.quotes ? job.quotes.length > 0 && job.quotes.some((x) => x.user_id === user.id) : false;

  return (
    <>
      <Grid item xs={12} sx={{ position: "relative" }}>
        Job details <Status status={job.status as StatusType} showLabel={true} wasQuoted={wasQuoted} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          id="type_of_clothing"
          name="type_of_clothing"
          label="Type of clothing"
          fullWidth
          value={TypesOfClothing[job.type_of_clothing as TypeOfClothing]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField disabled id="description" name="description" label="Description" fullWidth multiline rows={4} value={job.description} />
      </Grid>
      <Grid item xs={12}>
        <TextField disabled type="number" id="budget" name="budget" label="Budget" fullWidth value={job.budget} />
      </Grid>
    </>
  );
};

export default JobView;
