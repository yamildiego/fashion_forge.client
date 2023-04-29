import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { Grid, TextField } from "@mui/material";

import FormView from "../Common/FormView";

import TypesOfClothing from "../../TypesOfClothing.json";

import JobView from "../Common/JobView";

import ModalQuote from "../ModalQuote";

import * as appActions from "../../Actions/appActions";
import * as makerActions from "../../Actions/makerActions";

interface ViewProps {
  job: JobType;
  user: UserType;
  setJob: (view: JobType | null) => void;
  setOpenModal: (value: boolean) => void;
  cleanFormQuote: () => void;
}

const View = (props: ViewProps) => {
  const { job, user, cleanFormQuote, setOpenModal, setJob } = props;
  const wasQuoted: boolean = job.quotes ? job.quotes.length > 0 && job.quotes.some((x) => x.user_id === user.id) : false;

  const handleOpenModal = (job: JobType) => {
    cleanFormQuote();
    setJob(job);
    setOpenModal(true);
  };

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
          <JobView job={job} user={user} />
          {!wasQuoted && (
            <Grid item xs={12}>
              <ModalQuote handleOpenModal={() => handleOpenModal(job)} />
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
    job: state.appReducer.job,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setJob: appActions.setJob,
  setOpenModal: appActions.setOpenModal,
  cleanFormQuote: makerActions.cleanFormQuote,
};

export default withParamsAndNavigate(View, mapStateToProps, mapDispatchToProps);
