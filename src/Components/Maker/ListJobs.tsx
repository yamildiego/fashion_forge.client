import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import TypesOfClothing from "../../TypesOfClothing.json";
import moment from "moment";

import * as appActions from "../../Actions/appActions";
import * as makerActions from "../../Actions/makerActions";

const MAX_LENGTH = 80;

interface ListJobsProps {
  jobs: JobType[];
  setJob: (view: JobType) => void;
  setCurrentView: (view: string) => void;
}

const ListJobs = (props: ListJobsProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnClickView = (job: JobType) => {
    props.setJob(job);
    props.setCurrentView("view");
  };

  return (
    <>
      {props.jobs.map((job: JobType, index: number) => {
        const location = job.user ? `${job?.user?.address} ${job?.user?.state} ${job?.user?.postcode}` : "-";
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
                    <Button variant="contained" color="warning">
                      Quote
                    </Button>
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

            <Quote quote={job?.quote} />
            {/* 
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Text in a modal</h2>
                <p id="parent-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                <ChildModal />
              </Box>
            </Modal> */}
          </Card>
        );
      })}
    </>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Quote = (props: { quote: number | undefined }) => {
  const { quote = null } = props;
  const quoteIsValid = quote !== null;
  return (
    <Box sx={{ ...styles.label, background: quoteIsValid ? "#93ea99" : "#cad7ff" }}>
      <span style={{ fontWeight: "bold" }}>{quoteIsValid ? `QUOTED ($ ${quote.toFixed(2)})` : "TO PROCESS"}</span>
    </Box>
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
  label: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "12px",
  },
};

const mapStateToProps = (state: StateType) => {
  return {
    jobs: state.makerReducer.jobs,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  setJob: makerActions.setJob,
};

export default withParamsAndNavigate(ListJobs, mapStateToProps, mapDispatchToProps);
