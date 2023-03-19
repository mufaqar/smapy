import { createTRPCRouter } from "../../trpc";
import {
  getUserProfile,
  getUserProfileCheckComplete,
  updateUserProfile,
} from "./account";
import { sampleBankList } from "./select-lists";
import {
  createLifeInsurance,
  getLifeInsurance,
  updateLifeInsurance,
} from "./life-insurance";

export const advisorRouter = createTRPCRouter({
  getUserProfileCheckComplete,
  getUserProfile,
  updateUserProfile,

  getLifeInsurance,
  createLifeInsurance,
  updateLifeInsurance,

  sampleBankList,
});
