import { createTRPCRouter } from "../../trpc";
import { getUserProfile, updateUserProfile } from "./account";

export const advisorRouter = createTRPCRouter({
  getUserProfile,
  updateUserProfile,
});
