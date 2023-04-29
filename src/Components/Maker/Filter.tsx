import { ChangeEvent, useState } from "react";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid, TextField, InputLabel, MenuItem, FormControl } from "@mui/material";
import Collapse from "@mui/material/Collapse";

import TypesOfClothing from "../../TypesOfClothing.json";
import States from "../../States.json";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import * as makerActions from "../../Actions/makerActions";
import * as appActions from "../../Actions/appActions";

interface FilterProps {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  cleanFilter: () => void;
  setCurrentView: (view: string) => void;
}

const Filter = (props: FilterProps) => {
  const { filter, setFilter, cleanFilter, setCurrentView } = props;
  const [expanded, setExpanded] = useState(true);
  const [postcodeChanged, setPostcodeChanged] = useState(false);

  const handleOnChange = (filter: FilterType) => {
    setFilter(filter);
    setCurrentView("reload");
  };

  const handleCleanFilter = () => {
    cleanFilter();
    setCurrentView("reload");
  };

  return (
    <Card sx={{ width: "100%", boxShadow: "1px 1px 5px #ccc", position: "relative" }}>
      <CardContent sx={{ pb: "16px!important" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 0.5 }} color="text.secondary">
                Filter
                {(filter.type_of_clothing !== "All" || filter.state !== "All" || filter.postcode !== "") && (
                  <span onClick={handleCleanFilter} style={{ marginLeft: "8px", fontSize: "14px", cursor: "pointer", color: "#ff4f4f" }}>
                    Clean filter
                  </span>
                )}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => setExpanded(!expanded)} aria-label="delete" size="small">
                  <ArrowBackIosIcon
                    sx={{ transition: "transform 0.2s ease", ...(expanded ? {} : { transform: "rotate(-90deg)" }) }}
                    fontSize="inherit"
                  />
                </IconButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="clothing" sx={{ backgroundColor: "white" }}>
                  Type of clothing
                </InputLabel>
                <Select
                  value={filter.type_of_clothing}
                  onChange={(event: SelectChangeEvent<string>) => {
                    handleOnChange({ ...filter, type_of_clothing: (event.target?.value || "All") as TypeOfClothing });
                  }}
                  labelId="clothing"
                  id="clothing-select"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {Object.keys(TypesOfClothing).map((cloth: string, index: number) => (
                    <MenuItem key={`menu_item_clothing_${index}`} value={cloth}>
                      {TypesOfClothing[cloth as TypeOfClothing]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="state" sx={{ backgroundColor: "white" }}>
                  State
                </InputLabel>
                <Select
                  value={filter.state}
                  onChange={(event: SelectChangeEvent<string>) => {
                    handleOnChange({ ...filter, state: (event.target?.value || "All") as States });
                  }}
                  labelId="state"
                  id="state-select"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {Object.keys(States).map((state: string, index: number) => (
                    <MenuItem key={`menu_item_state_${index}`} value={state}>
                      {States[state as States]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={filter.postcode}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFilter({ ...filter, postcode: event.target.value });
                  setPostcodeChanged(true);
                }}
                fullWidth
                label="Postal code"
              />
            </Grid>
            {postcodeChanged && (
              <Grid item xs={12}>
                <Button onClick={() => setCurrentView("reload")}> Filter</Button>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    filter: state.makerReducer.filter,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFilter: makerActions.setFilter,
  cleanFilter: makerActions.cleanFilter,
  setCurrentView: appActions.setCurrentView,
};

export default withParamsAndNavigate(Filter, mapStateToProps, mapDispatchToProps);
