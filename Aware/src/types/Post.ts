export type Post = {
  idPost: string;
  username?: string | null;
  title?: string | null;
  avatar?: string | null;
  image?: string | null;
  likes: number | undefined;
  retweet: number | undefined;
  comments: number | undefined;
}
