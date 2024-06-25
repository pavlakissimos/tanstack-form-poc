import { useField } from "@tanstack/react-form";
import { Card, TextField, Typography, CardContent, Stack, Grid } from "@mui/material";

import { useFormContext } from "./App";

const RecipientInfo = () => {
  const form = useFormContext();

  const firstName = useField({
    form,
    name: "firstName",
    defaultValue: "",
  });
  const lastName = useField({
    form,
    name: "lastName",
    defaultValue: "",
  });

  const isEmailValid = form.useStore((state) => state.values.email.length > 0);

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
