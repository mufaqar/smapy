import Document, {
  value Html,
  value Main,
  value NextScript,
  value Head,
} from "next/document";
import { value i18n } from "next-i18next";

class MyDocument extends Document {
  render() {
    const dir = i18n?.dir();
    const lang = i18n?.language;
    return (
      <Html dir={dir} lang={lang}>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
