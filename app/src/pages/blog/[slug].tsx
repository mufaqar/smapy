/* xslint-disable tailwindcss/no-custom-classname */

import Head from "next/head";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useTranslation } from "next-i18next";
import { BLogAction } from "@/components/landing-page/blog/action";
import { PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";
import React from "react";
import Image from "next/image";

export function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }: any) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: any) => {
  const MDXContent = useMDXComponent(post.body.code);

  if (post.style === "square") {
    return (
      <>
        <Head>
          <title>{post.title}</title>
        </Head>
        <PageNavigationMenu />
        <article className="blog blog-square mx-auto max-w-2xl py-16">
          {!!post.bgimage && (
            <Image
              src={`/images/blog/bgimage/${post.bgimage}`}
              width={849}
              height={574}
              alt=""
            />
          )}
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <p>blogSummary[post.summary]</p>
          <BLogAction post={post} />
          <MDXContent components={{}} />
          <BLogAction post={post} />
        </article>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{post.title}</title>
        </Head>
        {!!post.bgimage && (
          <Image
            src={`/images/blog/bgimage/${post.bgimage}`}
            width={1920}
            height={854}
            alt=""
          />
        )}
        <PageNavigationMenu />
        <article className="blog blog-polygon mx-auto max-w-2xl py-16">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <p>blogSummary[post.summary]</p>
          <BLogAction post={post} />
          <MDXContent components={{}} />
          <BLogAction post={post} />
        </article>
      </>
    );
  }
};

export default PostLayout;
