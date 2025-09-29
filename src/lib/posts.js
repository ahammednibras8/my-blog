import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeAddClasses from "rehype-add-classes";
import { unified } from "unified";

const postsDirectory = path.join(process.cwd(), "public/posts");

// Get all posts metadata
export function getAllPosts() {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const filePath = path.join(postsDirectory, fileName);

            try {
                const fileContents = fs.readFileSync(filePath, "utf8");
                const { data } = matter(fileContents);
                const slug = fileName.replace(/\.md$/, "");
                return { ...data, slug };
            } catch (err) {
                console.error(`Failed to read ${fileName}:`, err);
                return null;
            }
        })
        .filter(Boolean);
}

// Get a single post by slug
export function getPostBySlug(slug) {
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...data, content, slug };
}

// Convert Markdown → HTML with classes for tables, headings, lists, code, spacing
export async function markdownToHtml(markdown) {
    const rawHtml = await remark().use(gfm).use(html).process(markdown);

    const contentHtml = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeAddClasses, {
            table: 'border border-gray-300 dark:border-gray-600 w-full text-left border-collapse my-6',
            th: 'border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700',
            td: 'border border-gray-300 dark:border-gray-600 px-4 py-2',
            h1: 'text-5xl font-bold mt-12 mb-6',
            h2: 'text-4xl font-semibold mt-10 mb-5',
            h3: 'text-3xl font-semibold mt-8 mb-4',
            h4: 'text-2xl font-semibold mt-6 mb-3',
            h5: 'text-xl font-semibold mt-4 mb-2',
            h6: 'text-lg font-semibold mt-3 mb-1',
            ul: 'list-disc ml-8 mb-6 space-y-2',
            ol: 'list-decimal ml-8 mb-6 space-y-2',
            li: 'mb-1',
            p: 'mb-6 leading-relaxed text-gray-800 dark:text-gray-200 text-lg',
            blockquote: 'border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-600 dark:text-gray-400 my-6',
            code: 'bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm font-mono',
            pre: 'bg-gray-100 dark:bg-gray-800 p-6 rounded overflow-x-auto my-6 font-mono text-sm',
        })
        .use(rehypeStringify)
        .process(rawHtml.toString());

    return contentHtml.toString();
}