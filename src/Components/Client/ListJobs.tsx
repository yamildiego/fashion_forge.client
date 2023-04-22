import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import TypesOfClothing from "../../TypesOfClothing.json";
import moment from "moment";

interface ListJobsProps {
  jobs: JobType[];
}

const ListJobs = (props: ListJobsProps) => {
  return (
    <>
      {props.jobs.map((job: JobType) => {
        return (
          <Card sx={{ width: "100%", boxShadow: "1px 1px 5px #ccc", position: "relative" }}>
            <CardContent>
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
                Description
                <span style={{ marginLeft: "15px", color: "#333" }}>{job.description}</span>
              </Typography>
            </CardContent>
            <Box sx={styles.date_created}>{`Datetime created: ${moment(new Date(job.created_at).getTime()).format(
              "HH:mm DD-MM-YYYY"
            )}`}</Box>
            <Quote quote={job?.quote} />
          </Card>
        );
      })}
    </>
  );
};

const Quote = (props: { quote: number | undefined }) => {
  const { quote = null } = props;
  const quoteIsValid = quote !== null;
  return (
    <Box sx={{ ...styles.label, background: quoteIsValid ? "#93ea99" : "#cad7ff" }}>
      {`Quote: `}
      <span style={{ fontWeight: "bold" }}>{quoteIsValid ? `$ ${quote.toFixed(2)}` : "PROCESSING"}</span>
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
    jobs: state.clientReducer.jobs,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  // setCurrentView: appActions.setCurrentView,
};

export default withParamsAndNavigate(ListJobs, mapStateToProps, mapDispatchToProps);
