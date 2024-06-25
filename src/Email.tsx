import { useField } from "@tanstack/react-form";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import * as yup from "yup";

import { useFormContext } from "./App";

const Email = () => {
  const form = useFormContext();

  const email = useField({
    form,
    name: "email",
    defaultValue: "",
    validators: {
      onBlur: yup.string().email("INVALID_EMAIL_ERROR_MSG").required("REQUIRED_EMAIL"),
    },
  });

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>What's your email?</Typography>
        <TextField
          id={email.name}
          label="Email"
          placeholder="Email"
          name={email.name}
          value={email.state.value}
          helperText={email.state.meta.errorMap["onBlur"]}
          onBlur={email.handleBlur}
          onChange={(event) => email.handleChange(event.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export { Email };
