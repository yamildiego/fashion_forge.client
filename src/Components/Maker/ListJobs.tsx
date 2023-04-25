import * as React from "react";
import moment from "moment";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import Status from "../Status";
import ModalQuote from "../ModalQuote";

import TypesOfClothing from "../../TypesOfClothing.json";

import * as appActions from "../../Actions/appActions";
import * as makerActions from "../../Actions/makerActions";

const MAX_LENGTH = 80;

interface ListJobsProps {
  jobs: JobType[];
  user: UserType;
  BORRAR: JobType;
  setJob: (view: JobType | null) => void;
  setCurrentView: (view: string) => void;
  setOpenModal: (value: boolean) => void;
  cleanFormQuote: () => void;
}

const ListJobs = (props: ListJobsProps) => {
  const { user, cleanFormQuote, setOpenModal } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnClickView = (job: JobType) => {
    props.setJob(job);
    props.setCurrentView("view");
  };

  const handleOpenModal = (job: JobType) => {
    cleanFormQuote();
    props.setJob(job);
    setOpenModal(true);
  };

  return (
    <>
      {props.jobs.map((job: JobType, index: number) => {
        const location = job.user ? `${job?.user?.address} ${job?.user?.state} ${job?.user?.postcode}` : "-";
        const hasQuoted = job.quotes && job.quotes.length > 0;
        const wasQuoted = job.quotes && job.quotes.some((x) => x.user_id == user.id);

        const status = hasQuoted && wasQuoted ? "quoted" : hasQuoted ? "with_quotes" : "new";

        return (
          <Card key={`key_maker_${index}`} sx={{ width: "100%", boxShadow: "1px 1px 5px #ccc", position: "relative" }}>
            <CardContent>
              <Grid container spacing={2} sx={{ minHeight: "150px" }}>
                <Grid item xs={9}>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Type of clothing:
                    <span style={{ marginLeft: "15px", color: "#333" }}>
                      {
                        //@ts-ignore
                        TypesOfClothing[job.type_of_clothing]
                      }
                    </span>
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Budget:
                    <span style={{ marginLeft: "15px", color: "#333" }}>{job.budget == null ? "-" : `$ ${job.budget.toFixed(2)}`}</span>
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    {`Description: `}

                    <span style={{ marginLeft: "15px", color: "#333" }}>{job.description.substring(0, MAX_LENGTH)}</span>
                    {job.description.substring(MAX_LENGTH) && (
                      <>
                        <Button onClick={handleOpen}>Read more</Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Description</DialogTitle>
                          <DialogContent>{job.description}</DialogContent>
                        </Dialog>
                      </>
                    )}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Location
                    <span style={{ marginLeft: "15px", color: "#333" }}>{location}</span>
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "flex-end", display: "flex", pb: 1 }}>
                  <Stack spacing={2}>
                    {!wasQuoted && <ModalQuote handleOpenModal={() => handleOpenModal(job)} />}

                    <Button onClick={() => handleOnClickView(job)} variant="contained" color="info">
                      View
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={styles.date_created}>{`Datetime created: ${moment(new Date(job.created_at).getTime()).format(
              "HH:mm DD-MM-YYYY"
            )}`}</Box>
            <Status status={status} len={job?.quotes?.length ?? 0} />
          </Card>
        );
      })}
    </>
  );
};

const styles = {
  date_created: {
    position: "absolute",
    right: 0,
    bottom: 0,
    fontSize: "11px",
    color: "#b4b3b3",
    padding: "2px 4px",
  },
  btn: { mt: 2, width: "100%" },
};

const mapStateToProps = (state: StateType) => {
  return {
    user: state.appReducer.user,
    jobs: state.makerReducer.jobs,
    BORRAR: state.makerReducer.job,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  setJob: makerActions.setJob,
  setOpenModal: appActions.setOpenModal,
  cleanFormQuote: makerActions.cleanFormQuote,
};

export default withParamsAndNavigate(ListJobs, mapStateToProps, mapDispatchToProps);
