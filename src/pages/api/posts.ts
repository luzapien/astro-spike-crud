import fs from "node:fs";
import path from "node:path";
import { getCollection } from "astro:content";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET: obtener todos los posts
export async function GET() {
  try {
    const posts = await getCollection("blog");

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      author: post.data.author,
      pubDate: post.data.pubDate,
      image: post.data.image || "",
    }));

    return new Response(
      JSON.stringify({
        posts: formattedPosts,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error reading posts:", error);

    return new Response(
      JSON.stringify({
        posts: [],
        error: "Error reading posts",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// POST: crear un nuevo post
export async function POST({ request }) {
  try {
    const data = await request.json();

    // Validación básica
    if (!data.title || !data.description || !data.author || !data.content) {
      return new Response(
        JSON.stringify({
          error: "Faltan campos obligatorios",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Generamos el slug automáticamente a partir del título
    const slug = generateSlug(data.title);

    // Directorio donde guardaremos los blogs
    const postsDir = path.resolve("src/content/blog");

    // Crear el directorio si no existe
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Contenido del archivo Markdown
    const fileContent = `---
title: ${JSON.stringify(data.title)}
description: ${JSON.stringify(data.description)}
author: ${JSON.stringify(data.author)}
pubDate: ${JSON.stringify(data.pubDate)}
image: ${JSON.stringify(data.image || "")}
---

${data.content}
`;

    const filePath = path.join(postsDir, `${slug}.md`);

    // Evitar sobrescribir un post existente
    if (fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({
          error: "Ya existe un post con ese título",
        }),
        {
          status: 409,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    fs.writeFileSync(filePath, fileContent, "utf-8");

    const newPost = {
      id: slug,
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      pubDate: data.pubDate,
      image: data.image || "",
      content: data.content,
    };

    return new Response(
      JSON.stringify({
        success: true,
        post: newPost,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error creating post:", error);

    return new Response(
      JSON.stringify({
        error: "Error al crear el post",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
