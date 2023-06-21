import React from "react";
import PortableText from "react-portable-text";
import { urlFor } from "../sanity";
import { Post as PostType } from "../type";

interface Props {
  post: PostType;
}

export const Posts = ({ post }: Props) => {
  return (
    <article className="w-full max-auto p-5 bg-secondaryColor/10">
      <h1
        className="font-titleFont font-medium text-[32px] text-primaryColor border-b-[1px] 
                border-b-cyan-800 mt-10 mb-3"
      >
        {post.title}
      </h1>
      <h2 className="font-bodyFont text-base mb-3">{post.description}</h2>
      <div className="flex items-center gap-2">
        <img
          src={urlFor(post.author.image).url()}
          alt="author"
          className="rounded-full w-12 h-12 object-cover bg-red-400"
        />
        <p className="font-bodyFont text-base">
          Blog posted by{" "}
          <span className="font-bold text-secondaryColor ">
            {post.author.name}
          </span>
        </p>
      </div>
      <div className="mt-10">
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "k790exw6"}
          content={post.body}
          serializers={{
            h1: (props: any) => (
              <h1 className="fontTitle text-3xl font-bold my-5" {...props} />
            ),
            h2: (props: any) => (
              <h2
                className="text-2xl font-bold my-5 font-titleFont"
                {...props}
              />
            ),
            h3: (props: any) => (
              <h3
                className="text-2xl font-bold my-5 font-titleFont"
                {...props}
              />
            ),
            li: ({ children }: any) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            link: ({ children, href }: any) => (
              <a href={href} className="text-cyan-400 hover:underline">
                {children}
              </a>
            ),
          }}
        />
      </div>
    </article>
  );
};
