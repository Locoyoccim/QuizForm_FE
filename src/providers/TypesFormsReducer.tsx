import { formProps } from "../interfaces/indexInterface";
import { Dispatch } from "react";

export type ActionForms =  {type: string, form: formProps | formProps[] }
export type dispatch = Dispatch<ActionForms>

export type ReducerExercise = {
  state: formProps[];
  dispatch: dispatch;
}