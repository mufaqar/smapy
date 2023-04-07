import { protectedProcedure } from "../../trpc";

export const sampleBankList = protectedProcedure.query(({ ctx }) => {
  return [
    { id: 12, title: 'בנק הפועלים בע"מ' },
    { id: 10, title: "בנק לאומי" },
    { id: 11, title: "בנק דיסקונט" },
    { id: 20, title: 'בנק מזרחי טפחות בע"מ' },
    { id: 31, title: "בנק הבינלאומי הראשון" },
    { id: 13, title: "בנק איגוד" },
    { id: 17, title: "בנק מרכנתיל דיסקונט" },
    { id: 4, title: 'נק יהב בע"מ' },
    { id: 14, title: 'בנק אוצר החייל בע"מ' },
    { id: 54, title: "בנק ירושלים" },
    { id: 68, title: "דקסיה ישראל" },
    { id: 34, title: "בנק ערבי ישראלי" },
    { id: 46, title: 'בנק מסד בע"מ' },
    { id: 52, title: "פועלי אגודת ישראל" },
    { id: 9, title: "בנק הדואר" },
    { id: 99, title: "בנק ישראל" },
    { id: 26, title: 'יובנק בע"מ' },
    { id: 22, title: "סיטיבנק" },
    { id: 23, title: "בנק היץ.אס.בי.סי" },
    { id: 39, title: "סטייט בנק אוף אינדיה" },
    { id: 18, title: "וואן זירו דיגיטל" },
  ].map(({ id, title }) => ({ id, title: `(${id}) ${title}` }));
});
