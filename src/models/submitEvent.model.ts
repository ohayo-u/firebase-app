import { FormEvent } from "react";

export interface CustomedSubmitEvent extends FormEvent<HTMLFormElement> {
  target: {
    elements: {
      dishName: { value: string };
    };
  } & HTMLFormElement;
}
