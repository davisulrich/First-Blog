// npm run dev --> to start up
// https://www.youtube.com/watch?v=Dc7LAgqy1_E
// write something here

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";
// import { DateTime } from "Luxon";

const graphcms = new GraphQLClient(
  "https://api-us-west-2.hygraph.com/v2/cl851yvws0lv701t1hfyohgy5/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog - Davis // Internet</title>
        <meta
          name="description"
          content="A blog to talk about your feelings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <div className={styles.logo}>
          <a href="https://www.davisontheinternet.com" className={styles.logo}>
            DAVIS // INTERNET
          </a>
        </div>
        <ul className={styles.navlinks}>
          <li>
            <a href="https://www.davisontheinternet.com">Home</a>
          </li>
          <li>
            <a href="https://www.davisontheinternet.com/about.html">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="https://www.davisontheinternet.com/play.html">Play</a>
          </li>
        </ul>
        <div className={styles.burger}>
          <div className={styles.burgerinner}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
            <div className={styles.line3}></div>
          </div>
        </div>
      </nav>
      <hr color="#fffff" />
      <div className={styles.homepagetitle}>
        <h1>Blog by Davis</h1>
      </div>
      <main className={styles.main}>
        {
          posts.map((post) => (
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
            />
          ))
          // .sort((a, b) => {
          //   const beforeDate = DateTime.fromFormat(
          //     // a.datePublished,
          //     "07-01-2022",
          //     "mm-dd-yyyy"
          //   );
          //   const afterDate = DateTime.fromFormat(
          //     // b.datePublished,
          //     "07-03-2022",
          //     "mm-dd-yyyy"
          //   );
          //   return afterDate - beforeDate;
          // })
        }
      </main>
      <div className={styles.backtotop}>
        <a href="#">Back to the top (????????????)???</a>
      </div>
    </div>
  );
}
