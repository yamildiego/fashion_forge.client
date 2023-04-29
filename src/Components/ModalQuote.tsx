import { ChangeEvent, useState } from "react";

import { Modal, Box, Grid, TextField, Button, InputAdornment, FilledInputProps } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";
import genericValidation from "../Functions/genericValidation";

import * as appActions from "../Actions/appActions";
import * as makerActions from "../Actions/makerActions";

interface ModalQuoteProps {
  job: JobType;
  openModal: boolean;
  formQuote: FormQuoteType;
  setFormQuote: (value: FormQuoteType) => void;
  setOpenModal: (value: boolean) => void;
  newQuote: (value: QuoteType, job_id: number) => void;
  handleOpenModal: () => void;
}

const ModalQuote = (props: ModalQuoteProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { job, openModal, setOpenModal, formQuote } = props;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnChange = (value: FormQuoteType) => {
    if (submitted) props.setFormQuote(runValidation(value));
    else props.setFormQuote(value);
  };

  const runValidation = (formQuote: FormQuoteType) => {
    let formValidated: FormQuoteType = {
      ...formQuote,
      quote: genericValidation(formQuote.quote.value, "required", "Quote"),
    };

    return formValidated;
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);
    let formValidated = runValidation(formQuote);
    props.setFormQuote(formValidated);
    let hasError = Object.values(formValidated).some((field) => field.error);
    let quoteFormatted = Object.entries(formValidated).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {} as QuoteType);

    if (!hasError) {
      props.newQuote(quoteFormatted, job.id);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={() => props.handleOpenModal()}>
        Quote
      </Button>
      <Modal
        open={openModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={styles.container_body}>
          <h2 id="parent-modal-title">Quote</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="quote"
                  name="quote"
                  label="Quote"
                  fullWidth
                  autoFocus
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formQuote.quote.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange({ ...formQuote, quote: { ...formQuote.quote, value: event.target.value } })
                  }
                  error={formQuote.quote.error && submitted}
                  helperText={submitted && formQuote.quote.error ? formQuote.quote.helperText : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="final_price"
                  name="final_price"
                  label="Final price"
                  fullWidth
                  disabled
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={(parseInt(formQuote.quote.value) * 1.15).toFixed(2)}
                  helperText={"Final price includes 15% service fee."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="estimated_time"
                  name="estimated_time"
                  label="Estimated time"
                  fullWidth
                  type="number"
                  InputProps={
                    {
                      step: "1",
                      endAdornment: <InputAdornment position="end">days</InputAdornment>,
                    } as Partial<FilledInputProps & { step?: string }>
                  }
                  value={formQuote.estimated_time.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange({
                      ...formQuote,
                      estimated_time: { ...formQuote.estimated_time, value: `${parseInt(event.target.value)}` },
                    })
                  }
                  error={formQuote.estimated_time.error && submitted}
                  helperText={submitted && formQuote.estimated_time.error ? formQuote.estimated_time.helperText : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="comments"
                  multiline
                  rows="4"
                  name="comments"
                  label="Comments"
                  fullWidth
                  value={formQuote.comments.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange({ ...formQuote, comments: { ...formQuote.comments, value: event.target.value } })
                  }
                  error={formQuote.comments.error && submitted}
                  helperText={submitted && formQuote.comments.error ? formQuote.comments.helperText : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary" sx={styles.btn}>
                  Quote
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleCloseModal} variant="contained" color="error" sx={styles.btn}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const styles = {
  container_body: {
    position: "absolute",
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
  },
  label: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "12px",
  },
  btn: { mt: 2, width: "100%" },
};

const mapStateToProps = (state: StateType) => {
  return {
    job: state.appReducer.job,
    formQuote: state.makerReducer.formQuote,
    openModal: state.appReducer.openModal,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormQuote: makerActions.setFormQuote,
  newQuote: makerActions.newQuote,
  setOpenModal: appActions.setOpenModal,
};

export default withParamsAndNavigate(ModalQuote, mapStateToProps, mapDispatchToProps);
