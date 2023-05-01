import React, { useState } from "react";

import { Box, Stack, Grid, Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import Status from "../Common/Status";

import TypesOfClothing from "../../TypesOfClothing.json";
import moment from "moment";

import * as clientActions from "../../Actions/clientActions";
import * as appActions from "../../Actions/appActions";
import * as imageActions from "../../Actions/imageActions";

interface ListJobsProps {
  jobs: JobType[];
  setJob: (view: JobType | null) => void;
  setCurrentView: (view: string) => void;
  publishJob: (jobId: number) => void;
  setFormNewJob: (view: FormJobType) => void;
  setImages: (images: ImageType[]) => void;
}

const MAX_LENGTH = 80;

const ListJobs = (props: ListJobsProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePublish = (job: JobType) => {
    if (job.status === "DRAFT") props.publishJob(job.id);
  };

  const handleOnClickAction = (job: JobType) => {
    props.setJob(job);

    if (job.status === "DRAFT") {
      let valueBudget = job.budget === null ? "" : job.budget.toString();

      let formJob = {
        type_of_clothing: { value: job.type_of_clothing, error: false, helperText: "" },
        description: { value: job.description, error: false, helperText: "" },
        budget: { value: valueBudget, error: false, helperText: "" },
      };

      props.setImages(job.images ? job.images : []);
      props.setFormNewJob(formJob);
      props.setCurrentView("editJob");
    } else {
      props.setCurrentView("view");
    }
  };

  return (
    <>
      {props.jobs.map((job: JobType, index: number) => {
        return (
          <Card key={`key_client_${index}`} sx={{ width: "100%", boxShadow: "1px 1px 5px #ccc", position: "relative" }}>
            <CardContent>
              <Grid container spacing={2} sx={{ minHeight: "130px" }}>
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
                </Grid>
                <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "flex-end", display: "flex", pb: 1 }}>
                  <Stack spacing={2}>
                    {job.status === "PUBLISHED" && job.quotes && job.quotes.length > 0 && (
                      <Button onClick={() => handlePublish(job)} variant="contained" color="primary">
                        Quotes
                      </Button>
                    )}
                    {job.status === "DRAFT" && (
                      <Button onClick={() => handlePublish(job)} variant="contained" color="primary">
                        Publish
                      </Button>
                    )}
                    <Button onClick={() => handleOnClickAction(job)} variant="contained" color="info">
                      {job.status === "DRAFT" ? "Edit" : "View"}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={styles.date_created}>{`Datetime created: ${moment(new Date(job.created_at).getTime()).format(
              "HH:mm DD-MM-YYYY"
            )}`}</Box>
            <Status status={job.status as StatusType} />
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
};

const mapStateToProps = (state: StateType) => {
  return {
    jobs: state.clientReducer.jobs,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  publishJob: clientActions.publishJob,
  setFormNewJob: clientActions.setFormNewJob,
  setJob: appActions.setJob,
  setImages: imageActions.setImages,
};

export default withParamsAndNavigate(ListJobs, mapStateToProps, mapDispatchToProps);
