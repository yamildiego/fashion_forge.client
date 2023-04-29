import React, { useState } from "react";

import { Box, Stack, Grid, Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import TypesOfClothing from "../../TypesOfClothing.json";
import moment from "moment";

import * as clientActions from "../../Actions/clientActions";

interface ListJobsProps {
  jobs: JobType[];
  publishJob: (jobId: number) => void;
}

const MAX_LENGTH = 80;

const ListJobs = (props: ListJobsProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePublish = (job: JobType) => {
    if (job.status === "DRAFT") props.publishJob(job.id);
  };

  return (
    <>
      {props.jobs.map((job: JobType, index: number) => {
        return (
          <Card key={`key_client_${index}`} sx={{ width: "100%", boxShadow: "1px 1px 5px #ccc", position: "relative" }}>
            <CardContent>
              <Grid container spacing={2} sx={{ minHeight: "100px" }}>
                <Grid item xs={8}>
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
                    {/* <span style={{ marginLeft: "15px", color: "#333" }}>{location}</span> */}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ justifyContent: "center", alignItems: "flex-end", display: "flex", pb: 1 }}>
                  {/* handleOnClickView(job) */}
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      sx={{ ...(job.status === "DRAFT" ? {} : { opacity: 0 }) }}
                      onClick={() => handlePublish(job)}
                      variant="contained"
                      color="primary"
                    >
                      Publish
                    </Button>
                    <Button onClick={() => {}} variant="contained" color="info">
                      View
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={styles.date_created}>{`Datetime created: ${moment(new Date(job.created_at).getTime()).format(
              "HH:mm DD-MM-YYYY"
            )}`}</Box>
            <Quote status={job.status as StatusType} />
          </Card>
        );
      })}
    </>
  );
};

const Quote = (props: { status: StatusType }) => {
  const { status } = props;
  const colors: { [key: string]: string } = {
    DRAFT: "#AAAAAA",
    PUBLISHED: "#17eba0",
    ASSINGNED: "#00e7ce",
    SHIPPED: "#ff8300",
    FINISHED: "#7630ea",
  };

  return <Box sx={{ ...styles.label, background: `${colors[status]}33`, color: colors[status] }}>{status}</Box>;
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
    cursor: "default",
    userSelect: "none",
  },
};

const mapStateToProps = (state: StateType) => {
  return {
    jobs: state.clientReducer.jobs,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  publishJob: clientActions.publishJob,
};

export default withParamsAndNavigate(ListJobs, mapStateToProps, mapDispatchToProps);
