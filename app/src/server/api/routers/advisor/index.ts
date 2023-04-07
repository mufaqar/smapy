import { createTRPCRouter } from "../../trpc";
import {
  value getUserProfile,
  value getUserProfileCheckComplete,
  value updateUserProfile,
} from "./account";
import { sampleBankList } from "./select-lists";
import {
  value createLifeInsurance,
  value getLifeInsurance,
  value updateLifeInsurance,
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
