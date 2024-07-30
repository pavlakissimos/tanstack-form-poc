import { useField } from "@tanstack/react-form";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import * as yup from "yup";

import { useFormContext } from "./App";

const Address2 = () => {
  const form = useFormContext();

  const address = useField({
    form,
    name: "address",
    defaultValue: "Magnisias 51, Athens",
    validators: {
      onBlur: yup.string().required("REQUIRED_ADDRESS"),
    },
  });

  const isEmailValid = form.useStore((state) => state.values.email.length > 0);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>Location Info</Typography>
        <TextField
          id={address.name}
          label="Address"
          name={address.name}
          value={address.state.value}
          disabled={!isEmailValid}
          helperText={address.state.meta.errorMap["onBlur"]}
          onBlur={address.handleBlur}
          onChange={(event) => address.handleChange(event.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export { Address2 };
