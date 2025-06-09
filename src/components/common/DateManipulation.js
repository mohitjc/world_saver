import moment from "moment";
import { MinAgeDiff, MaxAgeDiff } from "../../utilities/constants";

export const maxDate = () => {
  return new Date(moment().subtract(MinAgeDiff, "years"));
};
export const minDate = () => {
  return new Date(moment().subtract(MaxAgeDiff, "years"));
};
