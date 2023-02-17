// yarn run-admin-command --cmd scratchPad
import * as z from "zod";

import { UserProfileModel } from "../../../prisma/zod";
import { getPrismaSelect } from "../../utils/zod-utils";

export const scratchPad = async () => {
  return getPrismaSelect(
    UserProfileModel.extend({
      testArray: z.array(z.string()),
      obj: z.object({ a: z.string(), b: z.string() }),
    })
  );
};
