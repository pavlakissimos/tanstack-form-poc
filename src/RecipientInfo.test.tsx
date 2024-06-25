import { PropsWithChildren } from "react";
import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm } from "@tanstack/react-form";

import { RecipientInfo } from "./RecipientInfo";
import { FormContext, FormState } from "./App";

const FormProvider = ({
  defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
  },
  children,
}: PropsWithChildren<{ defaultValues?: FormState }>) => {
  const form = useForm<FormState>({
    defaultValues,
  });

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

describe("<RecipientInfo />", () => {
  test("renders", () => {
    render(<RecipientInfo />, {
      wrapper: ({ children }) => FormProvider({ children }),
    });

    expect(screen.getByLabelText("First Name")).toBeDisabled();
    expect(screen.getByLabelText("Last Name")).toBeDisabled();
  });

  test("renders enabled on valid email", async () => {
    render(<RecipientInfo />, {
      wrapper: ({ children }) =>
        FormProvider({ children, defaultValues: { email: "foo@nar.com" } }),
    });

    expect(screen.getByLabelText("First Name")).toBeEnabled();
    expect(screen.getByLabelText("Last Name")).toBeEnabled();
  });
});
