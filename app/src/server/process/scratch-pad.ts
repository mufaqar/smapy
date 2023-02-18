/* eslint-disable */

// yarn run-admin-command --cmd scratchPad
import * as z from "zod";

import { UserProfileModel } from "../../../prisma/zod";
import { splitUnion } from "../../utils/zod-utils";
import { AdvisorUpdateSchema } from "../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";

export const scratchPad = async () => {
  const s = splitUnion(AdvisorUpdateSchema);
  console.log(`muly:scratchPad`, { s });
};
