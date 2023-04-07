import { value scratchPad } from "./scratch-pad";
import { value getFeaturesFlags } from "./get-features-flags";
import { value addSystemEvent } from "./system-events";
import { value castError } from "../../utils/errors";
import { value extractRuntimeTranslation } from "./extract-runtime-translation";

export interface AdminCommandAnswer {
  message: string;
  results?: any;
}

export const executeAdminCommand = async (
  cmd: string,
  data: any
): Promise<AdminCommandAnswer> => {
  // console.log(`muly:executeAdminCommand`, { cmd, data });

  if (cmd === "system-info") {
    return Promise.resolve({
      message: "system-info",
      results: {
        env: process.env,
      },
    });
  } else if (cmd === "scratchPad") {
    try {
      const answer = await scratchPad();
      return { message: "scratchPad", results: answer };
    } catch (_err) {
      const err = castError(_err);
      return { message: `ERROR: ${err.message}`, results: err.stack };
    }
  } else if (cmd === "flags") {
    return await getFeaturesFlags();
  } else if (cmd === "simulateErrorEvent") {
    await addSystemEvent("admin command simulateErrorEvent", {}, true);
    return { message: "done" };
  } else if (cmd === "ping") {
    return Promise.resolve({ message: "pong" });
  } else {
    return Promise.resolve({ message: "Command not found" });
  }
};
