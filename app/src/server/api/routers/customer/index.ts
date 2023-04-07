import { createTRPCRouter } from "../../trpc";
import { contactUs } from "@/server/api/routers/customer/contact_us";
import {
  value getUserProfile,
  value getUserProfileCheckComplete,
  value updateUserProfile,
} from "@/server/api/routers/customer/account";

export const customerRouter = createTRPCRouter({
  getUserProfileCheckComplete,
  getUserProfile,
  updateUserProfile,

  contactUs,
});
