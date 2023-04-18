import React, { Component } from "react";

// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Link from "@mui/material/Link";

import { TextField, Grid } from "@mui/material";

const address_line_1 = React.createRef();

class Address extends Component {
  state = { address: "", suburb: "", state: "", postcode: "" };
  widget: any = null;

  componentDidMount() {
    var script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = this.loadWidget;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    if (this.widget) {
      this.widget.destroy();
      this.widget = null;
    }
  }

  loadWidget = () => {
    if (window.AddressFinder) {
      this.widget = new window.AddressFinder.Widget(document.getElementById("address_line_1"), "4GWE86YXKT3JDPM7LQVR", "AU");
      this.widget.on("result:select", (fullAddress: any, metaData: any) => {
        console.log(metaData);
        
        // this.props.handleSetAddress({
        //   address: `${metaData.address_line_1}${metaData.address_line_2 ? `, ${metaData.address_line_2}` : ``}`,
        //   suburb: metaData.locality_name,
        //   state: metaData.state_territory,
        //   postcode: metaData.postcode,
        // });
      });
    }
  };

  //   cleanAddress = () => {
  //     console.log("cleanAddress");
  //     address_line_1.current.value = "";
  //     this.props.handleSetAddress({
  //       address: "",
  //       suburb: "",
  //       state: "",
  //       postcode: "",
  //     });
  //   };

  render() {
    return (
      <>
        <Grid item sm={12}>
          {/* <Box sx={{ mt: 2, display: this.props.address ? "none" : "block" }}> */}
          <TextField
            fullWidth
            required={true}
            label="Shipping Address"
            type="search"
            id="address_line_1"
            placeholder="Search address here..."
            inputRef={address_line_1}
            // error={this.props.error}
            // helperText={this.props.error ? this.props.helperText : ""}
            // disabled={this.props.isLoading}
          />
        </Grid>
        <Grid item sm={6}>
          {/* <Box sx={{ mt: 2, display: this.props.address ? "none" : "block" }}> */}
          <TextField
            fullWidth
            required={true}
            label="State"
            type="search"
            id="address_line_1"
            disabled={true}
            placeholder="Search address here..."
            // inputRef={address_line_1}
            // error={this.props.error}
            // helperText={this.props.error ? this.props.helperText : ""}
            // disabled={this.props.isLoading}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            fullWidth
            required={true}
            label="Code Postal"
            type="search"
            id="address_line_1"
            disabled={true}
            placeholder="Search address here..."
            // inputRef={address_line_1}
            // error={this.props.error}
            // helperText={this.props.error ? this.props.helperText : ""}
            // disabled={this.props.isLoading}
          />
        </Grid>
        {/* {this.props.address && (
          <Box>
            <Link sx={{ cursor: "pointer", userSelect: "none" }} onClick={this.cleanAddress}>
              Change address
            </Link>
            <TextField
              sx={{ mt: 2 }}
              disabled={true}
              fullWidth
              label={this.props.address ? "" : "Address"}
              type="text"
              id="address"
              value={this.props.address}
            />
            <TextField
              sx={{ mt: 2 }}
              disabled={true}
              fullWidth
              label={this.props.suburb ? "" : "Suburb"}
              type="text"
              id="suburb"
              value={this.props.suburb}
            />
            <Stack direction={"row"} sx={{ mt: 2, justifyContent: "space-between" }}>
              <TextField
                disabled={true}
                sx={{ pr: 4 }}
                fullWidth
                label={this.props.state ? "" : "State"}
                type="text"
                id="state"
                value={this.props.state}
              />
              <TextField
                disabled={true}
                fullWidth
                label={this.props.postcode ? "" : "Postcode"}
                type="text"
                id="postcode"
                value={this.props.postcode}
              />
            </Stack>
          </Box>
        )} */}
      </>
    );
  }
}

export default Address;
