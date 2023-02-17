import { prisma } from "../db";
// import { sendSystemMessage } from "./notifications/contact-us-message";
import { format } from "date-fns";

export const addSystemEvent = async (
  subject: string,
  details: any,
  notify?: boolean
) => {
  const answer = await prisma.systemEvents.create({
    data: {
      subject,
      details,
    },
  });

  if (notify) {
    // await sendSystemMessage(
    //   subject,
    //   answer.id,
    //   format(new Date(), "HH:mm:ss X")
    // );
  }

  return answer.id;
};
