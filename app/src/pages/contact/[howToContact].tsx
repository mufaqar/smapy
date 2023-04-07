import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { CompareFlow } from "@/components/customer/compare/compare-flow";
import { ContactUsFlow } from "@/components/customer/contact-us/contact-us-flow";

export const getServerSideProps = i18nGetServerSideProps(["customer"]);

export default ContactUsFlow;
