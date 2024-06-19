import { Comment } from "./Comment";

export type Post = {
  idPost: string;
  title?: string | null;
  conteudo?: string | null;
  avatar?: string | null;
  image?: string | null;
  likes: number | undefined;
  comments: Comment[] | undefined;
}
