export const apiPosts = {
  getPosts: async () => {
    const response = await fetch("/api/posts");

    if (!response.ok) {
      throw new Error("Error al obtener los posts");
    }

    const data = await response.json();

    return data.posts;
  },

  createPost: async (postData) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el post");
    }

    const data = await response.json();

    return data.post;
  },
};
