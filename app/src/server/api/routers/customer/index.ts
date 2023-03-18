import { createTRPCRouter } from "../../trpc";
import { contactUs } from "@/server/api/routers/customer/contact_us";
import {
  getUserProfile,
  getUserProfileCheckComplete,
  updateUserProfile,
} from "@/server/api/routers/customer/account";

export const customerRouter = createTRPCRouter({
  getUserProfileCheckComplete,
  getUserProfile,
  updateUserProfile,

  contactUs,
});
