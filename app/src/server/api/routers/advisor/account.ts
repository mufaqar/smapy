import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { UserProfileModel } from "../../../../../prisma/zod";
import {
  AdvisorUpdatePages,
  AdvisorUpdateSchema,
} from "../../../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { TRPCError } from "@trpc/server";
import { formatPhoneNumber } from "@/utils/phone";

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

// Use also for customer, can separate later
export const preLoginCheckInfo = publicProcedure
  .input(
    z.object({
      id_card_number: z.string(),
      phone: z.string().transform((val) => formatPhoneNumber(val) || ""),
    })
  )
  .output(z.object({ found: z.boolean(), error: z.string().optional() }))
  .mutation(async ({ ctx, input: { id_card_number, phone } }) => {
    // Does not change anything but want to call it with await
    const users = await ctx.prisma.userProfile.findMany({
      where: { OR: [{ id_card_number }, { phone }] },
    });

    if (users.length < 1) {
      return { found: false };
    }

    const user = users[0];
    if (!user) {
      console.error(
        `preLoginCheckInfo:Unexpected data in user Profile, duplicate id/phone found`,
        { user: users, id_card_number, phone }
      );
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected data in user Profile, duplicate id/phone found",
      });
    }

    if (user.phone !== phone || user.id_card_number !== id_card_number) {
      return { found: true, error: "mismatch" };
    }

    return { found: true };
  });

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
