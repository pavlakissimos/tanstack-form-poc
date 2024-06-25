import { PropsWithChildren } from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm } from "@tanstack/react-form";

import { Email } from "./Email";
import { FormContext, FormState } from "./App";

const FormProvider = ({ children }: PropsWithChildren) => {
  const form = useForm<FormState>();

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

test("<Email />", () => {
  render(<Email />, { wrapper: FormProvider });

  expect(screen.getByLabelText("Email")).toBeEnabled();
});
