import * as z from "zod";
import { protectedProcedure } from "../../trpc";
import { lifeInsuranceModel } from "../../../../../prisma/zod";
import { TRPCError } from "@trpc/server";
import { AdvisorNewLifeInsuranceSchema } from "../../../../components/advisor/advisor-new-life-insurance/advisor-new-life-insurance-schema";
import { optionalUuidSchema } from "../../../../../prisma/zod-add-schema";

const LifeInsuranceSchemaSelect = {
  id: true,
  number_of_persons: true,
} as const;

const LifeInsuranceSchema = lifeInsuranceModel.pick(LifeInsuranceSchemaSelect);

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
      select: LifeInsuranceSchemaSelect,
    });

    console.log(`muly:getLifeInsurance`, {
      id: input,
      advisorId: ctx.user.id,
      answer,
    });
    return answer;
  });

export const updateLifeInsurance = protectedProcedure
  .input(
    z.object({ values: AdvisorNewLifeInsuranceSchema, id: optionalUuidSchema })
  )
  .output(LifeInsuranceSchema)
  .mutation(async ({ ctx, input: { id, values } }) => {
    if (!values) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    let lifeInsurance;
    if (id) {
      lifeInsurance = await ctx.prisma.lifeInsurance.update({
        where: { id },
        data: values,
        select: LifeInsuranceSchemaSelect,
      });
    } else {
      lifeInsurance = await ctx.prisma.lifeInsurance.create({
        data: { ...values, advisorId: ctx.user.id },
        select: LifeInsuranceSchemaSelect,
      });
    }

    return lifeInsurance;
  });
