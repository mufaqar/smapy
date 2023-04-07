import { publicProcedure } from "@/server/api/trpc";
import { contactDetailsPhone } from "@/components/customer/contact-us/contact-us-schema";
import { Novu } from "@novu/node";
import { env } from "@/env.mjs";

const novu = new Novu(env.NOVU_API_KEY);

export const contactUs = publicProcedure
  .input(contactDetailsPhone)
  .mutation(
    async ({ ctx, input: { contact_info, name, product, subject } }) => {
      // await addSystemEvent(`Contact us request [${product}]`, {
      //   contact_info,
      //   full_name,
      //   product,
      //   subject,
      // });

      await ctx.prisma.contactUsRequest.create({
        data: { contact_info, name, product, subject },
      });

      await novu.trigger("contact-us", {
        to: {
          subscriberId: "muly-oved",
        },
        payload: { contact_info, name, product, subject: subject || "" },
      });
    }
  );
