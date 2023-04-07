import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

export const BLogAction = ({ post }: any) => {
  const { t } = useTranslation("landing-page");

  if (post.action) {
    return (
      <Link href={post.action} legacyBehavior passHref>
        <div className="self-end rounded-[20px] bg-gradient-to-r from-[rgba(254,5,85,1)] to-[rgba(255,135,0,1)] p-2 text-base text-white">
          {t("blog.action")}
        </div>
      </Link>
    );
  } else {
    return null;
  }
};
