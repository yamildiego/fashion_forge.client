import React, { Component, createRef } from "react";
import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import { TextField, Grid, Button } from "@mui/material";

import genericValidation from "../Functions/genericValidation";

import * as clientActions from "../Actions/clientActions";

interface AddressProps {
  submitted: boolean;
  formNewClient: FormClientType;
  setFormNewClient: (view: FormClientType) => void;
}

class Address extends Component<AddressProps> {
  state = { address: "", suburb: "", state: "", postcode: "" };
  private widget: any = null;
  private address_line_1 = createRef();

  componentDidMount() {
    var script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = this.loadWidget;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    if (this.widget && this.widget !== null && typeof this.widget?.destroy === "function") {
      this.widget.destroy();
      this.widget = null;
    }
  }

  loadWidget = async () => {
    if (window.AddressFinder) {
      this.widget = await new window.AddressFinder.Widget(document.getElementById("address_line_1"), "4GWE86YXKT3JDPM7LQVR", "AU");

      this.widget.on("result:select", (fullAddress: any, metaData: any) => {
        const addressValue = `${metaData.address_line_1}${metaData.address_line_2 ? `, ${metaData.address_line_2}` : ``}`;
        this.props.setFormNewClient({
          ...this.props.formNewClient,
          address: genericValidation(addressValue, "required", "Address"),
          state: metaData.state_territory,
          postcode: metaData.postcode,
        });
      });
    }
  };

  handleButtonModifyAddress = () => {
    if (this.props.submitted)
      this.props.setFormNewClient({
        ...this.props.formNewClient,
        address: genericValidation("", "required", "Address"),
        state: "",
        postcode: "",
      });
    else
      this.props.setFormNewClient({
        ...this.props.formNewClient,
        address: { value: "", error: false, helperText: "" },
        state: "",
        postcode: "",
      });

    //@ts-ignore
    this.address_line_1.current.value = "";
    //@ts-ignore
    this.address_line_1.current.focus();
  };

  render() {
    const { formNewClient, submitted } = this.props;
    return (
      <>
        <Grid item sm={8}>
          <TextField
            fullWidth
            required={true}
            label="Address"
            type="search"
            id="address_line_1"
            placeholder="Search address here..."
            inputRef={this.address_line_1}
            disabled={formNewClient.address.value !== ""}
            error={formNewClient.address.error && submitted}
            helperText={formNewClient.address.error ? formNewClient.address.helperText : ""}
          />
        </Grid>
        <Grid item sm={4} sx={styles.btnChangeAddress}>
          <Button onClick={this.handleButtonModifyAddress}>Modify address</Button>
        </Grid>
        <Grid item sm={6}>
          <TextField fullWidth label="State" disabled placeholder="State" value={formNewClient.address.value ? formNewClient.state : ""} />
        </Grid>
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            disabled
            placeholder="Postal Code"
            value={formNewClient.address.value ? formNewClient.postcode : ""}
          />
        </Grid>
      </>
    );
  }
}

const styles = {
  btnChangeAddress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const mapStateToProps = (state: StateType) => {
  return {
    formNewClient: state.clientReducer.formNewClient,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewClient: clientActions.setFormNewClient,
};

export default withParamsAndNavigate(Address, mapStateToProps, mapDispatchToProps);
