import React, { Component, createRef } from "react";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { TextField, Grid, Button } from "@mui/material";

import genericValidation from "../../Functions/genericValidation";

import * as userActions from "../../Actions/userActions";

interface AddressProps {
  submitted: boolean;
  formNewUser: FormUserType;
  setFormNewUser: (view: FormUserType) => void;
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
        this.props.setFormNewUser({
          ...this.props.formNewUser,
          address: genericValidation(addressValue, "required", "Address"),
          state: genericValidation(metaData.state_territory, "required", "State"),
          postcode: genericValidation(metaData.postcode, "required", "Postal code"),
        });
      });
    }
  };

  handleButtonModifyAddress = () => {
    if (this.props.submitted)
      this.props.setFormNewUser({
        ...this.props.formNewUser,
        address: genericValidation("", "required", "Address"),
        state: genericValidation("", "", "State"),
        postcode: genericValidation("", "", "Postal code"),
      });
    else
      this.props.setFormNewUser({
        ...this.props.formNewUser,
        address: genericValidation("", "", "Address"),
        state: genericValidation("", "", "State"),
        postcode: genericValidation("", "", "Postal code"),
      });

    //@ts-ignore
    this.address_line_1.current.value = "";
    //@ts-ignore
    this.address_line_1.current.focus();
  };

  render() {
    const { formNewUser, submitted } = this.props;
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
            disabled={formNewUser.address.value !== ""}
            error={formNewUser.address.error && submitted}
            helperText={submitted && formNewUser.address.error ? formNewUser.address.helperText : ""}
          />
        </Grid>
        <Grid item sm={4} sx={styles.btnChangeAddress}>
          <Button onClick={this.handleButtonModifyAddress}>Modify address</Button>
        </Grid>
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="State"
            disabled
            placeholder="State"
            value={formNewUser.address.value ? formNewUser.state.value : ""}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            disabled
            placeholder="Postal Code"
            value={formNewUser.address.value ? formNewUser.postcode.value : ""}
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
    formNewUser: state.userReducer.formNewUser,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewUser: userActions.setFormNewUser,
};

export default withParamsAndNavigate(Address, mapStateToProps, mapDispatchToProps);
