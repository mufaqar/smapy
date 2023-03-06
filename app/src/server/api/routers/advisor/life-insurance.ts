import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import {
  CompletelifeInsurance,
  CompletelifeInsuranceCustomer,
  customerModel,
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
    lifeInsuranceCustomer: { include: { customer: true } },
  },
} satisfies {
  include: Prisma.lifeInsuranceInclude;
};

const LifeInsuranceSchema = lifeInsuranceModel.extend({
  lifeInsuranceCustomer: lifeInsuranceCustomerModel
    .omit({ lifeInsuranceId: true, customerId: true })
    .extend({
      customerId: z.string().optional(),
      customer: customerModel
        .omit({ id: true, userId: true })
        .extend({ id: optionalUuidSchema }),
    })
    .array()
    .nullish(),
});

export type LifeInsuranceType = z.infer<typeof LifeInsuranceSchema>;

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
    return {
      ...data,
      loan_tracks: loan_tracks ? LoanTracks.parse(loan_tracks) : [],
    };
  });

export const createLifeInsurance = protectedProcedure
  .input(lifeInsuranceModel.pick({ number_of_customers: true }))
  .output(LifeInsuranceSchema)
  .mutation(async ({ ctx, input }) => {
    const lifeInsurance = await ctx.prisma.lifeInsurance.create({
      data: { ...input, advisorId: ctx.user.id },
      ...lifeInsuranceSchemaSelect,
    });

    const { loan_tracks: loan_tracks_json, ...rest } = lifeInsurance;
    return {
      ...rest,
      loan_tracks: loan_tracks_json ? LoanTracks.parse(loan_tracks_json) : [],
    };
  });

export const updateLifeInsurance = protectedProcedure
  .input(LifeInsuranceSchema)
  .output(LifeInsuranceSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, advisorId, lifeInsuranceCustomer, loan_tracks, ...save } =
      input;

    const lifeInsuranceId = id;
    const loan_tracksWithType = loan_tracks
      ? LoanTracks.parse(loan_tracks)
      : [];

    console.log(`muly:updateLifeInsurance 1`, {
      lifeInsuranceCustomer,
      updatelifeInsuranceCustomer: {
        create: (lifeInsuranceCustomer || [])
          .filter(({ customerId }) => !customerId)
          .map(({ customerId, customer, sort }) => {
            const { id, ...create } = customer;
            return {
              sort,
              customer: { create },
            };
          }),
        update: (lifeInsuranceCustomer || [])
          .filter(({ customerId }) => customerId)
          .map(({ customerId, customer, sort }) => {
            const { id, ...update } = customer;
            return {
              where: {
                lifeInsuranceId_customerId: {
                  customerId: customerId!,
                  lifeInsuranceId,
                },
              },
              data: { sort, customer: { update } },
            };
          }),
      },
    });

    const lifeInsurance = await ctx.prisma.lifeInsurance.update({
      where: { id, advisorId: ctx.user.id },
      data: {
        ...save,
        loan_tracks: loan_tracksWithType as any, // help it to match Prisma.JSON
        lifeInsuranceCustomer: {
          create: (lifeInsuranceCustomer || [])
            .filter(({ customerId }) => !customerId)
            .map(({ customerId, customer, sort }) => {
              const { id, ...create } = customer;
              return {
                sort,
                customer: { create },
              };
            }),
          update: (lifeInsuranceCustomer || [])
            .filter(({ customerId }) => customerId)
            .map(({ customerId, customer, sort }) => {
              const { id, ...update } = customer;
              return {
                where: {
                  lifeInsuranceId_customerId: {
                    customerId: customerId!,
                    lifeInsuranceId,
                  },
                },
                data: { sort, customer: { update } },
              };
            }),
        },
      },
      ...lifeInsuranceSchemaSelect,
    });

    const { loan_tracks: loan_tracks_json, ...rest } = lifeInsurance;
    return {
      ...rest,
      loan_tracks: loan_tracks_json ? LoanTracks.parse(loan_tracks_json) : [],
    };
  });
