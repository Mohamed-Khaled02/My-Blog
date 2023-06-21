import { GetStaticProps } from "next";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Posts } from "../../components/Posts";
import { sanityClient, urlFor } from "../../sanity";
import { Post as PostType } from "../../type";

interface Props {
  post: PostType;
}

const Post = ({ post }: Props) => {
  return (
    <div>
      <Header />
      {/* main Image */}
      <img
        src={urlFor(post.mainImage).url()}
        alt={post.title}
        className="w-full h-96 object-cover"
      />
      {/* main Image */}
      {/* post body */}
      <div className="mb-10  max-w-3xl mx-auto">
        {/* The indivdual post component start here */}
        <Posts post={post} />
        {/* The indivdual post component finish here */}
        <hr className="max-w-lg my-5 mx-auto border-[1px] border-secondaryColor" />
        {/* the comment section start here */}
        <Comments post={post} />
        {/* the comment section finish here */}
      </div>
      {/* post body */}
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "post"]{
        _id,
        slug{
        current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: PostType) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        "author": author->{name, image},
        "comments":*[_type == "comment" && post._ref == ^._id && approved == true],
        mainImage,
        slug,
        body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return { notFound: true };
  }
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export default Post;
