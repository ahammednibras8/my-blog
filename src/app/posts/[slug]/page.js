import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, markdownToHtml } from "../../../lib/posts";

// Generate static params for SSG
export function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

// Generate dynamic metadata per post
export async function generateMetadata({ params }) {
    const { slug } = params;
    const post = getPostBySlug(slug);

    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} – The Story Log`,
        description: post.description || post.excerpt || "What broke, how we fixed it, and the single principle learned that day.",
        openGraph: {
            title: `${post.title} – The Story Log`,
            description: post.description || post.excerpt,
            url: `https://ahammednibras.is-a.dev/posts/${slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} – The Story Log`,
            description: post.description || post.excerpt,
        },
    };
}

// Post page component
export default async function Post({ params }) {
    const { slug } = params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    const contentHtml = await markdownToHtml(post.content);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center px-4 sm:px-6 lg:px-16 py-16 transition-colors duration-300">
            <article className="w-full max-w-5xl prose prose-lg sm:prose-xl dark:prose-invert">
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                    {post.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 text-base sm:text-lg">
                    {post.date}
                </p>
                <div dangerouslySetInnerHTML={{ __html: contentHtml.toString() }} />
            </article>
        </main>
    );
}