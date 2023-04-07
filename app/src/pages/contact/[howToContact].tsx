import { value i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { value CompareFlow } from "@/components/customer/compare/compare-flow";
import { value ContactUsFlow } from "@/components/customer/contact-us/contact-us-flow";

export const getServerSideProps = i18nGetServerSideProps(["customer"]);

export default ContactUsFlow;
