import React from "react";
import { ButtonPrimary, ButtonSecondary } from ".";

export default {
  title: "Atoms/Button",
};

export const Variants = () => (
  <>
    <ButtonPrimary>Button</ButtonPrimary>
    <ButtonSecondary>Button</ButtonSecondary>
  </>
);

export const Sizes = () => (
  <>
    <ButtonPrimary>Button</ButtonPrimary>
    <ButtonPrimary size="lg">Button</ButtonPrimary>
  </>
);
