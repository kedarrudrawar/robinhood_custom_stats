import {
  isErrorDetail,
  isErrorWithDescription,
} from "./RHResponseTypePredicates";
import { RobinhoodError } from "./RobinhoodResponseConstants";

export function getErrorMessage(error: RobinhoodError): string | null {
  if (isErrorWithDescription(error)) {
    return error.error_description;
  } else if (isErrorDetail(error)) {
    return error.detail;
  }
  return null;
}
