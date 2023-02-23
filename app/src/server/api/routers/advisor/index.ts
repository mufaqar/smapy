import { createTRPCRouter } from "../../trpc";
import { getUserProfile, updateUserProfile } from "./account";
import { sampleBankList } from "./select-lists";

export const advisorRouter = createTRPCRouter({
  getUserProfile,
  updateUserProfile,

  sampleBankList,
});
