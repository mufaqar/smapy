import "../src/styles/globals.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
