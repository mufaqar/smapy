import { createTRPCRouter } from "../../trpc";
import {
  getUserProfile,
  getUserProfileCheckComplete,
  preLoginCheckInfo,
  updateUserProfile,
} from "./account";
import { sampleBankList } from "./select-lists";
import {
  createLifeInsurance,
  getLifeInsurance,
  updateLifeInsurance,
} from "./life-insurance";

export const advisorRouter = createTRPCRouter({
  preLoginCheckInfo,
  getUserProfileCheckComplete,
  getUserProfile,
  updateUserProfile,

  getLifeInsurance,
  createLifeInsurance,
  updateLifeInsurance,

  sampleBankList,
});
