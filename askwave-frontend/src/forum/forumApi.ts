import { Comment, Post } from './forumTypes';

const API_BASE_URL = 'http://localhost:3001';
const POSTS_STORAGE_KEY = 'askwave.mock.posts';
const COMMENTS_STORAGE_KEY = 'askwave.mock.comments';

const mockPostsSeed: Post[] = [
  {
    id: 1,
    title: 'Best quiet study spots before finals week',
    content: 'I am collecting places with stable Wi-Fi, power outlets, and fewer crowds after 6pm. The library pods are full most nights, so hidden gems would help.',
    owner: 'maya',
    category: 'Academic',
    total_likes: 3,
    total_comments: 0,
    created_at: '2026-05-22T12:15:00.000Z',
    liked_by: ['maya', 'jordan', 'liam'],
  },
  {
    id: 2,
    title: 'Free design tools for student club posters',
    content: 'Sharing a few easy tools for event posters, Instagram slides, and quick background removal. If anyone has Canva alternatives with better templates, add them here.',
    owner: 'zoe',
    category: 'Resources',
    total_likes: 4,
    total_comments: 0,
    created_at: '2026-05-21T09:40:00.000Z',
    liked_by: ['zoe', 'anna', 'daniel', 'sophia'],
  },
  {
    id: 3,
    title: 'Anyone joining the beach cleanup this Saturday?',
    content: 'Our sustainability club still has room for volunteers and photographers. Transport is covered and first-timers are welcome.',
    owner: 'nathan',
    category: 'Events',
    total_likes: 2,
    total_comments: 0,
    created_at: '2026-05-20T15:25:00.000Z',
    liked_by: ['maya', 'nathan'],
  },
  {
    id: 4,
    title: 'How do you balance internships with coursework?',
    content: 'I am planning next semester and want realistic advice on workload, commute, and keeping weekends from disappearing completely.',
    owner: 'olivia',
    category: 'Well-being',
    total_likes: 5,
    total_comments: 0,
    created_at: '2026-05-19T07:55:00.000Z',
    liked_by: ['olivia', 'ethan', 'zoe', 'jordan', 'mia'],
  },
  {
    id: 5,
    title: 'Recruiting beginners for the badminton social',
    content: 'No tryout needed. We are organizing friendly matches for people who want a relaxed way to start and meet others.',
    owner: 'aaron',
    category: 'CCAs',
    total_likes: 3,
    total_comments: 0,
    created_at: '2026-05-18T18:05:00.000Z',
    liked_by: ['aaron', 'nathan', 'sophia'],
  },
  {
    id: 6,
    title: 'Tips for writing a stronger project reflection',
    content: 'My lecturer wants clearer takeaways, not just a summary of what we built. What structure has worked for your reflections?',
    owner: 'anna',
    category: 'General',
    total_likes: 4,
    total_comments: 0,
    created_at: '2026-05-17T11:30:00.000Z',
    liked_by: ['anna', 'maya', 'liam', 'zoe'],
  },
];

const mockCommentsSeed: Comment[] = [
  {
    id: 1,
    content: 'The engineering block rooftop lounge is surprisingly quiet after dinner, especially on weekdays.',
    owner: 'liam',
    original_post: 'Best quiet study spots before finals week',
    created_at: '2026-05-22T13:02:00.000Z',
  },
  {
    id: 2,
    content: 'If you do not mind soft background noise, the business school cafe stays productive until closing.',
    owner: 'sophia',
    original_post: 'Best quiet study spots before finals week',
    created_at: '2026-05-22T14:18:00.000Z',
  },
  {
    id: 3,
    content: 'Figma plus the Icons8 plugin has been enough for most of our club materials.',
    owner: 'daniel',
    original_post: 'Free design tools for student club posters',
    created_at: '2026-05-21T10:06:00.000Z',
  },
  {
    id: 4,
    content: 'Photopea is great when someone sends you a PSD and you do not want to pay for Photoshop.',
    owner: 'maya',
    original_post: 'Free design tools for student club posters',
    created_at: '2026-05-21T11:43:00.000Z',
  },
  {
    id: 5,
    content: 'I am in. Is there a meeting point on campus before everyone heads out?',
    owner: 'mia',
    original_post: 'Anyone joining the beach cleanup this Saturday?',
    created_at: '2026-05-20T16:01:00.000Z',
  },
  {
    id: 6,
    content: 'I capped myself at four internship days during heavy assessment weeks and it kept things manageable.',
    owner: 'ethan',
    original_post: 'How do you balance internships with coursework?',
    created_at: '2026-05-19T08:20:00.000Z',
  },
  {
    id: 7,
    content: 'Blocking one evening with no work at all helped more than trying to squeeze in tiny breaks every day.',
    owner: 'zoe',
    original_post: 'How do you balance internships with coursework?',
    created_at: '2026-05-19T09:35:00.000Z',
  },
  {
    id: 8,
    content: 'Please count me in. I have not played in years, so beginner pace sounds perfect.',
    owner: 'jordan',
    original_post: 'Recruiting beginners for the badminton social',
    created_at: '2026-05-18T18:42:00.000Z',
  },
  {
    id: 9,
    content: 'I usually split reflections into context, what changed, what I would do differently, and one metric.',
    owner: 'olivia',
    original_post: 'Tips for writing a stronger project reflection',
    created_at: '2026-05-17T12:04:00.000Z',
  },
];

const isBrowser = typeof window !== 'undefined';

const clonePosts = (posts: Post[]) => posts.map((post) => ({ ...post, liked_by: [...(post.liked_by || [])] }));
const cloneComments = (comments: Comment[]) => comments.map((comment) => ({ ...comment }));

const sortPosts = (posts: Post[]) =>
  [...posts].sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());

const normalizePosts = (posts: Post[], comments: Comment[]) =>
  sortPosts(
    posts.map((post) => {
      const likedBy = post.liked_by || [];
      const totalComments = comments.filter((comment) => comment.original_post === post.title).length;

      return {
        ...post,
        liked_by: likedBy,
        total_likes: likedBy.length,
        total_comments: totalComments,
      };
    })
  );

const savePosts = (posts: Post[]) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

const saveComments = (comments: Comment[]) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
};

const loadMockPosts = (): Post[] => {
  if (!isBrowser) {
    return normalizePosts(clonePosts(mockPostsSeed), cloneComments(mockCommentsSeed));
  }

  const savedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
  const savedComments = window.localStorage.getItem(COMMENTS_STORAGE_KEY);

  if (!savedPosts || !savedComments) {
    const seededPosts = normalizePosts(clonePosts(mockPostsSeed), cloneComments(mockCommentsSeed));
    const seededComments = cloneComments(mockCommentsSeed);
    savePosts(seededPosts);
    saveComments(seededComments);
    return seededPosts;
  }

  return normalizePosts(JSON.parse(savedPosts) as Post[], JSON.parse(savedComments) as Comment[]);
};

const loadMockComments = (): Comment[] => {
  if (!isBrowser) {
    return cloneComments(mockCommentsSeed);
  }

  const savedComments = window.localStorage.getItem(COMMENTS_STORAGE_KEY);

  if (!savedComments) {
    const seededComments = cloneComments(mockCommentsSeed);
    saveComments(seededComments);
    return seededComments;
  }

  return JSON.parse(savedComments) as Comment[];
};

const syncMockPostTotals = () => {
  const comments = loadMockComments();
  const normalizedPosts = normalizePosts(loadMockPosts(), comments);
  savePosts(normalizedPosts);
  return normalizedPosts;
};

const filterPosts = (posts: Post[], filters: { category?: string; owner?: string }) =>
  posts.filter((post) => {
    if (filters.category && filters.category !== 'all' && post.category !== filters.category) {
      return false;
    }

    if (filters.owner && post.owner !== filters.owner) {
      return false;
    }

    return true;
  });

const searchLocalPosts = (posts: Post[], searchQuery: string) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.content.toLowerCase().includes(normalizedQuery)
  );
};

const buildPostsUrl = (filters: { category?: string; owner?: string }) => {
  const searchParams = new URLSearchParams();

  if (filters.category && filters.category !== 'all') {
    searchParams.set('category', filters.category);
  }

  if (filters.owner) {
    searchParams.set('owner', filters.owner);
  }

  const queryString = searchParams.toString();
  return `${API_BASE_URL}/all-posts${queryString ? `?${queryString}` : ''}`;
};

export const getPosts = async (filters: { category?: string; owner?: string } = {}): Promise<Post[]> => {
  try {
    const response = await fetch(buildPostsUrl(filters), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as Post[];
    if (Array.isArray(data) && data.length > 0) {
      return sortPosts(data);
    }
  } catch (error) {
    console.error('Error fetching posts from API, using mock data instead:', error);
  }

  return filterPosts(syncMockPostTotals(), filters);
};

export const searchPosts = async (searchQuery: string): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: searchQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as Post[];
    if (Array.isArray(data) && data.length > 0) {
      return sortPosts(data);
    }
  } catch (error) {
    console.error('Error searching posts from API, using mock data instead:', error);
  }

  return searchLocalPosts(syncMockPostTotals(), searchQuery);
};

export const togglePostLike = async (title: string, username: string, liked: boolean): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${liked ? 'unlike-post' : 'like-post'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        username,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedPosts = await getPosts();
    const updatedPost = updatedPosts.find((post) => post.title === title);

    if (updatedPost) {
      return updatedPost;
    }
  } catch (error) {
    console.error('Error updating like on API, using mock data instead:', error);
  }

  const posts = loadMockPosts();
  const postIndex = posts.findIndex((post) => post.title === title);

  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  const targetPost = posts[postIndex];
  const likedBy = targetPost.liked_by || [];
  const hasLikedPost = likedBy.includes(username);

  const updatedLikedBy =
    liked || hasLikedPost
      ? likedBy.filter((name) => name !== username)
      : [...likedBy, username];

  const updatedPost = {
    ...targetPost,
    liked_by: updatedLikedBy,
    total_likes: updatedLikedBy.length,
  };

  posts[postIndex] = updatedPost;
  savePosts(sortPosts(posts));

  return updatedPost;
};

export const getComments = async (title: string): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-comments/${encodeURIComponent(title)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching comments from API, using mock data instead:', error);
  }

  return loadMockComments().filter((comment) => comment.original_post === title);
};

export const publishComment = async (content: string, owner: string, originalPost: string): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/publish-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        owner,
        original_post: originalPost,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return getComments(originalPost);
  } catch (error) {
    console.error('Error publishing comment to API, using mock data instead:', error);
  }

  const comments = loadMockComments();
  const newComment: Comment = {
    id: comments.reduce((highestId, comment) => Math.max(highestId, comment.id), 0) + 1,
    content,
    owner,
    original_post: originalPost,
    created_at: new Date().toISOString(),
  };

  const updatedComments = [...comments, newComment];
  saveComments(updatedComments);
  syncMockPostTotals();

  return updatedComments.filter((comment) => comment.original_post === originalPost);
};

export const deleteComment = async (
  id: number,
  owner: string,
  originalPost: string
): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        owner,
        original_post: originalPost,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return getComments(originalPost);
  } catch (error) {
    console.error('Error deleting comment from API, using mock data instead:', error);
  }

  const comments = loadMockComments();
  const updatedComments = comments.filter((comment) => comment.id !== id);
  saveComments(updatedComments);
  syncMockPostTotals();

  return updatedComments.filter((comment) => comment.original_post === originalPost);
};

export const createPost = async (postInput: {
  title: string;
  content: string;
  owner: string;
  category: string;
}): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/publish-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postInput),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedPosts = await getPosts({ owner: postInput.owner });
    const createdPost = updatedPosts.find((post) => post.title === postInput.title);

    if (createdPost) {
      return createdPost;
    }
  } catch (error) {
    console.error('Error creating post on API, using mock data instead:', error);
  }

  const posts = loadMockPosts();

  if (posts.some((post) => post.title === postInput.title)) {
    throw new Error('A post with the same title exists.');
  }

  const newPost: Post = {
    id: posts.reduce((highestId, post) => Math.max(highestId, post.id), 0) + 1,
    ...postInput,
    total_likes: 0,
    total_comments: 0,
    created_at: new Date().toISOString(),
    liked_by: [],
  };

  const updatedPosts = sortPosts([...posts, newPost]);
  savePosts(updatedPosts);

  return newPost;
};

export const updatePost = async (postInput: {
  title: string;
  content: string;
  owner: string;
  category: string;
  originalTitle?: string;
}): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/edit-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: postInput.title,
        content: postInput.content,
        owner: postInput.owner,
        category: postInput.category,
        original_title: postInput.originalTitle,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedPosts = await getPosts({ owner: postInput.owner });
    const updatedPost = updatedPosts.find((post) => post.title === postInput.title);

    if (updatedPost) {
      return updatedPost;
    }
  } catch (error) {
    console.error('Error editing post on API, using mock data instead:', error);
  }

  const posts = loadMockPosts();
  const comments = loadMockComments();
  const originalTitle = postInput.originalTitle || postInput.title;
  const postIndex = posts.findIndex((post) => post.title === originalTitle && post.owner === postInput.owner);

  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  if (postInput.title !== originalTitle && posts.some((post) => post.title === postInput.title)) {
    throw new Error('A post with the same title exists.');
  }

  const currentPost = posts[postIndex];
  const updatedPost: Post = {
    ...currentPost,
    title: postInput.title,
    content: postInput.content,
    category: postInput.category,
  };

  posts[postIndex] = updatedPost;
  savePosts(normalizePosts(posts, comments));

  if (postInput.title !== originalTitle) {
    const updatedComments = comments.map((comment) =>
      comment.original_post === originalTitle
        ? { ...comment, original_post: postInput.title }
        : comment
    );
    saveComments(updatedComments);
    savePosts(normalizePosts(posts, updatedComments));
  }

  return updatedPost;
};

export const removePost = async (title: string, owner: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        owner,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error('Error deleting post on API, using mock data instead:', error);
  }

  const posts = loadMockPosts().filter((post) => !(post.title === title && post.owner === owner));
  const comments = loadMockComments().filter((comment) => comment.original_post !== title);

  saveComments(comments);
  savePosts(normalizePosts(posts, comments));
};
