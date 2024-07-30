import { useField } from "@tanstack/react-form";
import {
  Card,
  TextField,
  Typography,
  CardContent,
  Stack,
  Grid,
} from "@mui/material";
import * as yup from "yup";

import { useFormContext } from "./App";

const makeFirstNameSchema = (email: string) =>
  yup.string().when([], {
    is: () => email.length > 0,
    then: (schema) => schema.required("REQUIRED_FIRSTNAME"),
  });

const makeLastNameSchema = (email: string) =>
  yup.string().when([], {
    is: () => email.length > 0,
    then: (schema) => schema.required("REQUIRED_LASTNAME"),
  });

const RecipientInfo = () => {
  const form = useFormContext();

  const email = form.useStore((state) => state.values.email);
  const isEmailValid = email.length > 0;

  const firstName = useField({
    form,
    name: "firstName",
    defaultValue: "",
    validators: {
      onBlur: makeFirstNameSchema(email),
      onSubmit: makeFirstNameSchema(email),
    },
  });
  const lastName = useField({
    form,
    name: "lastName",
    defaultValue: "",
    validators: {
      onBlur: makeLastNameSchema(email),
      onSubmit: makeLastNameSchema(email),
    },
  });

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>Recipient Info</Typography>
        <Stack spacing={1}>
          <Grid container gap={0.5}>
            <Grid item xs>
              <TextField
                id={firstName.name}
                label="First Name"
                name={firstName.name}
                helperText={firstName.state.meta.errorMap["onBlur"]}
                disabled={!isEmailValid}
                onBlur={firstName.handleBlur}
                onChange={(event) => firstName.handleChange(event.target.value)}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={lastName.name}
                label="Last Name"
                name={lastName.name}
                helperText={lastName.state.meta.errorMap["onBlur"]}
                disabled={!isEmailValid}
                onBlur={lastName.handleBlur}
                onChange={(event) => lastName.handleChange(event.target.value)}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { RecipientInfo };
