import { getCollection } from "astro:content";

export interface Post {
  title: string;
  description: string;
  date: Date;
  link: string;
}

const all = async (): Promise<Post[]> => {
  return (await getCollection("posts"))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((post) => {
      return {
        ...(post.data || {}),
        link: `/post/${post.id}`,
      };
    });
};

export default { all };
