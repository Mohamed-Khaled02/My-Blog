import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../type";
import Link from "next/link";

interface PostsProps {
  posts: [Post];
}

export default function Home({ posts }: PostsProps) {
  return (
    <div>
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div
          className={
            "px-4 max-w-7xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6"
          }
        >
          {posts.map((post) => {
            return (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] groub">
                  <div className="h-3/5 w-full overflow-hidden group">
                    <img
                      className="h-full w-full brightness-75 group-hover:brightness-100 object-cover duration-300 group-hover:scale-110"
                      width={380}
                      height={350}
                      src={urlFor(post.mainImage).url()!}
                      alt="image"
                    />
                  </div>
                  <div className="h-2/5 w-full flex justify-center flex-col">
                    <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                      <p>{post.title}</p>
                      <img
                        src={urlFor(post.author.image).url()!}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <p className="f text-base py-1 px-3">
                      {post.description.substring(0, 60)}... by{" "}
                      <span className="font-semibold">{post.author.name}</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image,
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
}
