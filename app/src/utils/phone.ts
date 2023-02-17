import parsePhoneNumber from "libphonenumber-js";

export const validatePhoneNumber = (
  phone?: string
): { phone?: string; error?: string } => {
  if (!phone) {
    return { error: "Phone number is required" };
  }

  const phoneNumber = parsePhoneNumber(phone, "IL");
  console.log("muly:phoneNumber parsePhoneNumber", {
    phoneNumber,
    possible: phoneNumber?.isPossible(),
  });

  if (phoneNumber) {
    if (!phoneNumber.isPossible()) {
      return { error: "Does not look like a valid phone number" };
      // } else if (phoneNumber.countryCallingCode !== "972") {
      //   return { error: "Right now we support only US customers" };
    } else {
      const phone = phoneNumber.formatInternational();
      return { phone };
    }
  } else {
    return { error: "Not a valid phone number" };
  }
};

export const formatPhoneNumber = (phone?: string) => {
  if (phone) {
    const phoneNumber = parsePhoneNumber(phone, "IL");

    // console.log(`muly:formatPhoneNumber`, {
    //   phoneNumber,
    //   phone,
    // });

    if (phoneNumber && phoneNumber.isPossible()) {
      console.log(
        `muly:formatPhoneNumber B ${phoneNumber.formatInternational()}`,
        {}
      );
      return phoneNumber.formatInternational();
    }
  }

  return phone;
};
