import { useField } from "@tanstack/react-form";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import * as yup from "yup";
import { TLDs as topLevelDomains } from "global-tld-list";

import { useFormContext } from "./App";

const emailSchema = yup
  .string()
  .email("INVALID_EMAIL_ERROR")
  .test({
    name: "is-valid-tld",
    message: "INVALID_EMAIL_ERROR_MSG",
    test: (value) => {
      if (!value) return true;
      const [, domain] = value.split("@");
      if (!domain) return false;
      const tld = domain.split(".").slice(-1)[0];
      return topLevelDomains.indexOf(tld.toLowerCase()) >= 0;
    },
  })
  .required("REQUIRED_EMAIL");

const Email = () => {
  const form = useFormContext();

  const email = useField({
    form,
    name: "email",
    defaultValue: "",
    validators: {
      onBlur: emailSchema,
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
