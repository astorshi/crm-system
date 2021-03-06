import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/order.action";
import { useHistory, useLocation } from "react-router";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  
  root: {
    "& *": {
      color: "white",
      fontSize: "20px",
      borderColor: "white",
    },
    "& .MuiInput-underline:before": {
      borderColor: "white",
    },
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  color: {
    color: "white",
    borderColor: "white",
    "& *": {
      color: "white",
      fontSize: "20px",
      borderColor: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontSize: "20px",
    },
    "& .MuiInput-input": {
      color: "transparent",
    },
    "& .MuiFormLabel-filled+.MuiInput-formControl .MuiInput-input": {
      color: "white",
    },
    "& .Mui-focused .MuiInput-input": {
      color: "white",
    },
    "& .MuiSelect-root": {
      color: "white",
    },
    "& .MuiSelect-select": {
      color: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
      fontSize: "20px",
    },
    "& :before": {
      borderColor: "currentColor",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: "currentColor",
    },
  },
}));

export default function OrderAdd({ client, id }) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch, //???????????????????????? ?????????????????????? ????????????
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(getOrder(data, id, history));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <br />
      <h1>
        ?????????? ??????????{" "}
        {client && (
          <span>
            ?????? ?????????????? {client.surname} {client.name} {client.patronymic}
          </span>
        )}{" "}
      </h1>
      <br />
      <hr />
      {errors.name && <p>???????????????????????? ????????, ???? ?????????? 15 ????????????????</p>}
      <Grid className={classes.form} container spacing={3}>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????? ????????????"
            type="text"
            id="standard-required"
            {...register("number", { required: true, maxLength: 15 })}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????? ????????????"
            type="text"
            id="standard-required"
            {...register("typeFurn")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????????? ????????????"
            type="text"
            id="standard-required"
            {...register("priceFurn")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????????? ????????????????"
            type="email"
            id="standard-required"
            {...register("priceDeliv")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            id="standard-required"
            label="???????? ????????????????"
            type="date"
            // className={classes.textField}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            {...register("dateDeliv")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????????? ????????????"
            type="text"
            id="standard-required"
            {...register("priceConstr")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            id="standard-required"
            label="???????? ????????????"
            type="date"
            // className={classes.textField}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            {...register("dateConstr")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????? ????????????????"
            type="text"
            id="standard-required"
            {...register("teamDeliv")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????? ????????????"
            type="text"
            id="standard-required"
            {...register("teamConstr")}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">???????????? ????????????</InputLabel>
            <Select
              className={classes.color}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("status")}
            >
              <MenuItem value={"???????????????? ????????????????"}>???????????????? ????????????????</MenuItem>
              <MenuItem value={"?? ????????????"}>?? ????????????</MenuItem>
              <MenuItem value={"????????????"}>????????????</MenuItem>
              <MenuItem value={"??????????????????"}>??????????????????</MenuItem>
              <MenuItem value={"????????????????????"}>????????????????????</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="?????????????????????? ?? ????????????"
            type="text"
            id="standard-required"
            {...register("commentsWhenCreate")}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <hr />
      <br />
      <div>
        <Button
          type="submit"
          style={{ color: "black" }}
          variant="contained"
          color="primary"
        >
          ?????????????? ??????????
        </Button>
      </div>
    </form>
  );
}
