export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="text-center max-w-lg">
                <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">
                    404
                </h1>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Page Not Found
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Sorry, we couldn’t find the page you were looking for.
                </p>
                <a
                    href="/"
                    className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                >
                    Go Back Home
                </a>
            </div>
        </main>
    );
}