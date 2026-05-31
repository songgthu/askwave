export interface Post {
  id: number;
  title: string;
  content: string;
  owner: string;
  category: string;
  total_likes: number;
  total_comments: number;
  created_at: string;
  liked_by: string[];
  formatted_date?: string;
}

export interface Comment {
  id: number;
  content: string;
  owner: string;
  original_post: string;
  created_at: string;
  formatted_date?: string;
}
