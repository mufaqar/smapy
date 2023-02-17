import { scratchPad } from "./scratch-pad";
import { getFeaturesFlags } from './get-features-flags';
import { addSystemEvent } from './system-events';

export interface AdminCommandAnswer {
  message: string;
  results?: any;
}

export const executeAdminCommand = async (
  cmd: string,
  data: any
): Promise<AdminCommandAnswer> => {
  // console.log(`muly:executeAdminCommand`, { cmd, data });

  if (cmd === "scratchPad") {
    try {
      const answer = await scratchPad();
      return { message: "scratchPad", results: answer };
    } catch (err: any) {
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
