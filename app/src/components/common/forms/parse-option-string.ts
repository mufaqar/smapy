import { ChoiceType } from "./TextField";

export const parseOptionsString = (
  input?: string
): Record<string, string | number | boolean> => {
  let textPart = input?.trim() || "";
  const hasOptions = textPart.indexOf("#");

  if (!textPart || hasOptions < 0) {
    return { placeHolder: textPart };
  } else {
    let placeHolder = "";
    if (!textPart.trimStart().startsWith("#") && hasOptions >= 0) {
      placeHolder = textPart.substring(0, hasOptions);
      textPart = textPart.substring(hasOptions);
    }

    const res: Record<string, string | number | boolean> = { placeHolder };

    const parts = textPart.replace(/(?:\r\n|\r|\n)/g, " ").split("#");
    parts.forEach((part: string) => {
      if (part) {
        let splitPos = part.indexOf(":");
        // if (splitPos < 0) {
        //   splitPos = part.indexOf("=");
        // }

        let key = part.substring(0).trim();
        let value: any = true;
        if (splitPos > 0) {
          key = part.substring(0, splitPos).trim();
          value = castToCorrectValue(part.substring(splitPos + 1).trim());
          // console.log('VAR:', key, value);
        }

        res[key] = value;
      }
    });

    console.log(`muly:parseOptionsString`, { res, input, textPart, parts });
    return res;
  }
};

export const parseChoices = (value: string): ChoiceType[] => {
  return value
    .split(",")
    .map((s) => s.trim())
    .map((choice: string) => {
      const parts = choice.split("=").map((s) => s.trim());
      if (!parts[0]) {
        throw new Error(`Bad choices id ${value}`);
      }

      if (parts.length === 1) {
        return { id: castToCorrectId(parts[0]), title: String(parts[0]) };
      } else if (parts.length === 2) {
        return { id: castToCorrectId(parts[0]), title: String(parts[1]) };
      } else {
        throw new Error(`Bad choices string ${value}`);
      }
    });
};

const castToCorrectValue = (value: string): string | number | boolean => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else if (isNaN(parseInt(value)) || value !== `${parseInt(value)}`) {
    return String(value);
  } else {
    return parseInt(value);
  }
};

const castToCorrectId = (value: string): string | number => {
  if (isNaN(parseInt(value))) {
    return String(value);
  } else {
    return parseInt(value);
  }
};
