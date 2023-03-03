import * as z from "zod";
import { protectedProcedure } from "../../trpc";
import {
  CompletelifeInsurance,
  lifeInsuranceCustomerModel,
  lifeInsuranceModel,
  RelatedlifeInsuranceCustomerModel,
  RelatedlifeInsuranceModel,
  RelatedUserProfileModel,
} from "../../../../../prisma/zod";
import { TRPCError } from "@trpc/server";
import {
  LoanTracks,
  optionalUuidSchema,
} from "../../../../../prisma/zod-add-schema";
import type { Prisma } from "@prisma/client";

const lifeInsuranceSchemaSelect = {
  include: {
    lifeInsuranceCustomer: true,
  },
} satisfies {
  include: Prisma.lifeInsuranceInclude;
};

const LifeInsuranceSchema = lifeInsuranceModel.extend({
  lifeInsuranceCustomer: lifeInsuranceCustomerModel.array().nullish(),
});

export const getLifeInsurance = protectedProcedure
  .input(optionalUuidSchema)
  .output(LifeInsuranceSchema.nullish())
  .query(async ({ ctx, input }) => {
    // This is ugly that we need to call server for non value
    // but it solve a problem with hydration
    if (!input) {
      return null;
    }

    const answer = await ctx.prisma.lifeInsurance.findFirstOrThrow({
      where: { id: input, advisorId: ctx.user.id },
      ...lifeInsuranceSchemaSelect,
    });

    console.log(`muly:getLifeInsurance`, {
      id: input,
      advisorId: ctx.user.id,
      answer,
    });

    const { loan_tracks, ...data } = answer;
    return { ...data, loan_tracks: LoanTracks.parse(loan_tracks) };
  });

export const updateLifeInsurance = protectedProcedure
  .input(z.object({ values: LifeInsuranceSchema, id: optionalUuidSchema }))
  .output(LifeInsuranceSchema)
  .mutation(async ({ ctx, input: { id, values } }) => {
    if (!values) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const { advisorId, lifeInsuranceCustomer, loan_tracks, ...sdata } = values;

    const loan_tracksWithType = LoanTracks.parse(loan_tracks);

    // const l = [];
    const data = {
      ...sdata,
      advisorId: ctx.user.id,
      loan_tracks: loan_tracksWithType as any, // help it to match Prisma.JSON
    };

    let lifeInsurance;
    if (id) {
      lifeInsurance = await ctx.prisma.lifeInsurance.update({
        where: { id },
        data,
        ...lifeInsuranceSchemaSelect,
      });
    } else {
      lifeInsurance = await ctx.prisma.lifeInsurance.create({
        data: { ...data, advisorId: ctx.user.id },
        ...lifeInsuranceSchemaSelect,
      });
    }

    const { loan_tracks: loan_tracks_json, ...rest } = lifeInsurance;
    return { ...rest, loan_tracks: LoanTracks.parse(loan_tracks_json) };
  });
