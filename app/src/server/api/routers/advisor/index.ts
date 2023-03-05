import { createTRPCRouter } from "../../trpc";
import { getUserProfile, updateUserProfile } from "./account";
import { sampleBankList } from "./select-lists";
import {
  createLifeInsurance,
  getLifeInsurance,
  updateLifeInsurance,
} from "./life-insurance";

export const advisorRouter = createTRPCRouter({
  getUserProfile,
  updateUserProfile,

  getLifeInsurance,
  createLifeInsurance,
  updateLifeInsurance,

  sampleBankList,
});
