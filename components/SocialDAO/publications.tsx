import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { useStore, useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import { PostsContainer } from "@/style/post";
import useSWR from "swr";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  const socialDao = useStore(SocialDAOStore);
  const posts = useObservable(socialDao.posts);

  return (
    <PostsContainer>
      {posts ? (
        posts.map((post: any) => {
          if (post.__typename === "Post") {
            return <Post {...post} key={post.id} />;
          }
        })
      ) : (
        <LightSansSerifText>loading....</LightSansSerifText>
      )}

      {!posts.length ? (
        <LightSansSerifText>No Publications</LightSansSerifText>
      ) : null}
    </PostsContainer>
  );
};

export default Publications;
