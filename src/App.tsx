import React from "react";
import { type FormApi, useForm } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import { Container, Stack, Button } from "@mui/material";

import { Email } from "./Email";
import { RecipientInfo } from "./RecipientInfo";

const FormContext = React.createContext({} as FormApi<FormState, ReturnType<typeof yupValidator>>);
const useFormContext = () => {
  const form = React.useContext(FormContext);

  if (!form) {
    throw new Error("useFormContext has to be rendered inside FormContext.Provider");
  }

  return form;
};

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
};

function App() {
  const form = useForm<FormState, ReturnType<typeof yupValidator>>({
    validatorAdapter: yupValidator(),
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        padding: "24px 0",
      }}
    >
      <FormContext.Provider value={form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Stack spacing={2}>
            <Email />
            <RecipientInfo />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </FormContext.Provider>
    </Container>
  );
}

export default App;
export { useFormContext, FormContext };
export type { FormState };
