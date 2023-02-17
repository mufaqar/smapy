import { protectedProcedure } from "../../trpc";
import {
  schemaRegister,
  schemaSignin,
} from "../../../../components/auth/advisor-auth-schema";
import { UserProfileModel } from "../../../../../prisma/zod";
import * as z from "zod";
import {
  AdvisorUpdateSchema,
  schemaStep0,
  schemaStep1,
  schemaStep3,
} from "../../../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";

const UserProfileSchemaSelect = {
  id: true,
  id_card_number: true,
  first_name: true,
  last_name: true,

  years_experience: true,
  worker_type: true,
  workplace_name: true,
  number_of_files: true,
  certificate_id_picture: true,
  certificate_id_picture_later: true,
  bank_name: true,
  bank_branch: true,
  bank_number: true,
  bank_branch_number: true,
  bank_account: true,
  bank_details_later: true,
  signed_terms: true,
  signed_terms_signature: true,
} as const;

const UserProfileSchema = UserProfileModel.pick(UserProfileSchemaSelect);

export const getUserProfile = protectedProcedure
  .output(UserProfileSchema.nullish())
  .query(async ({ ctx }) => {
    console.log(`muly:`, { user: ctx.user });
    return ctx.prisma.userProfile.findUnique({
      where: { id: ctx.user.id },
      select: UserProfileSchemaSelect,
    });
  });

export const updateUserProfile = protectedProcedure
  .input(AdvisorUpdateSchema)
  .output(UserProfileSchema)
  .mutation(async ({ ctx, input }) => {
    const userProfile = await ctx.prisma.userProfile.upsert({
      where: { id: ctx.user.id },
      update: input,
      create: {
        id: ctx.user.id,
        ...input,
      },
      select: UserProfileSchemaSelect,
    });

    return userProfile;
  });
