import { getAllPosts } from "../lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 sm:px-6 lg:px-24 py-16 transition-colors duration-300">

      {/* Header: Simple, Honest Mission */}
      <header className="text-center mb-24 max-w-4xl">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-snug">
          The Story Log
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          What broke, how we fixed it, and the single principle I learned that day.
        </p>
      </header>

      {/* Blog Posts: Optimized for Scanability */}
      <section className="w-full max-w-4xl space-y-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl p-8 transition-all duration-200 shadow-md hover:shadow-2xl hover:ring-4 hover:ring-blue-500/30 dark:shadow-xl dark:hover:shadow-blue-500/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h2>
            {post.date && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base tracking-wide">
                {post.date}
              </p>
            )}
            {post.description && (
              <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg leading-normal">
                {post.description}
              </p>
            )}

            {/* Actionable CTA */}
            <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold text-base transition-transform duration-200 group-hover:translate-x-1">
              Read the Full Deconstruction →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
