import fs from "node:fs";
import path from "node:path";

// 1. GET: Returns a list of all existing posts
export async function GET() {
  try {
    const postsDir = path.resolve("src/pages/post");

    // If the directory doesn't exist yet, return an empty array
    if (!fs.existsSync(postsDir)) {
      return new Response(JSON.stringify({ posts: [] }), { status: 200 });
    }

    const files = fs.readdirSync(postsDir);
    const posts = files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Simple extraction of frontmatter properties for the list view
        const titleMatch = fileContent.match(/title:\s*"([^"]*)"/);
        const descMatch = fileContent.match(/description:\s*"([^"]*)"/);
        const authorMatch = fileContent.match(/author:\s*"([^"]*)"/);
        const dateMatch = fileContent.match(/pubDate:\s*"([^"]*)"/);
        const slug = file.replace(/\.mdx?$/, "");

        return {
          id: slug,
          slug: slug,
          title: titleMatch ? titleMatch[1] : slug,
          description: descMatch ? descMatch[1] : "",
          author: authorMatch ? authorMatch[1] : "",
          pubDate: dateMatch ? dateMatch[1] : "",
        };
      });

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ posts: [], error: "Error reading posts" }),
      { status: 500 },
    );
  }
}

// 2. POST: Creates the new .mdx file (keeps your existing code)
export async function POST({ request }) {
  const data = await request.json();

  const fileContent = `---
layout: ../../layouts/PostLayout.astro
title: "${data.title}"
description: "${data.description}"
author: "${data.author}"
pubDate: "${data.pubDate}"
image: "${data.image}"
slug: "${data.slug}"
---
${data.content}
`;

  const filePath = path.resolve(`src/pages/post/${data.slug}.mdx`);
  fs.writeFileSync(filePath, fileContent);

  return new Response(JSON.stringify({ success: true, post: data }), {
    status: 200,
  });
}
