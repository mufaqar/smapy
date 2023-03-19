import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { UserProfileModel } from "../../../../../prisma/zod";
import {
  AdvisorUpdatePages,
  AdvisorUpdateSchema,
} from "../../../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { TRPCError } from "@trpc/server";

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
  advisor_status: true,
} as const;

const UserProfileSchema = UserProfileModel.pick(UserProfileSchemaSelect);

export const getUserProfileCheckComplete = protectedProcedure
  .output(
    z.object({
      user: UserProfileSchema.nullish(),
      inCompleteStep: z.number(),
    })
  )
  .query(async ({ ctx }) => {
    console.log(`muly:`, { user: ctx.user });
    const user = await ctx.prisma.userProfile.findUniqueOrThrow({
      where: { id: ctx.user.id },
      select: UserProfileSchemaSelect,
    });

    // console.log(`muly:getUserProfileCheckComplete`, { user });
    const inCompleteStep = Object.values(AdvisorUpdatePages.pages).findIndex(
      (page, idx) => {
        if (page._def.typeName !== "ZodUndefined") {
          const result = page.safeParse(user);
          console.log(`muly:page validate`, { result });
          return !result.success;
        }

        return false;
      }
    );

    return { user, inCompleteStep };
  });

export const getUserProfile = protectedProcedure
  .output(UserProfileSchema.nullish())
  .query(async ({ ctx }) => {
    console.log(`muly:`, { user: ctx.user });
    return ctx.prisma.userProfile.findUniqueOrThrow({
      where: { id: ctx.user.id },
      select: UserProfileSchemaSelect,
    });
  });

export const updateUserProfile = protectedProcedure
  .input(AdvisorUpdateSchema)
  .output(UserProfileSchema)
  .mutation(async ({ ctx, input }) => {
    if (!input) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const userProfile = await ctx.prisma.userProfile.upsert({
      where: { id: ctx.user.id },
      update: { is_advisor: true, ...input },
      create: {
        id: ctx.user.id,
        is_advisor: true,
        ...input,
      },
      select: UserProfileSchemaSelect,
    });

    return userProfile;
  });
