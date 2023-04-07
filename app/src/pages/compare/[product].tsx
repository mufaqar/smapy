import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { CompareFlow } from "@/components/customer/compare/compare-flow";

export const getServerSideProps = i18nGetServerSideProps(["customer"]);

export default CompareFlow;
