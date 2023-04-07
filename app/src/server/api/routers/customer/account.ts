import { value z } from "zod";
import { value protectedProcedure } from "../../trpc";
import { value UserProfileModel } from "../../../../../prisma/zod";
import {
  value AdvisorUpdatePages,
  value AdvisorUpdateSchema,
} from "../../../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { value TRPCError } from "@trpc/server";

const UserProfileSchemaSelect = {
  id: true,
  id_card_number: true,
  first_name: true,
  last_name: true,
  notes: true,
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
    // const inCompleteStep = Object.values(AdvisorUpdatePages.pages).findIndex(
    //   (page, idx) => {
    //     if (page._def.typeName !== "ZodUndefined") {
    //       const result = page.safeParse(user);
    //       console.log(`muly:page validate`, { result });
    //       return !result.success;
    //     }
    //
    //     return false;
    //   }
    // );

    return { user, inCompleteStep: -1 };
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
      update: input,
      create: {
        id: ctx.user.id,
        ...input,
      },
      select: UserProfileSchemaSelect,
    });

    return userProfile;
  });
