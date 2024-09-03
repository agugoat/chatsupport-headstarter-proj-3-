import Link from 'next/link';

const Landing = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-100 dark:text-gray-100 mb-4">Assistant GPT</h1>
        <p className="text-lg text-gray-200 dark:text-gray-300 mb-8 text-center">
          Use our next-generation LLM technology to improve your productivity!
        </p>

        <Link href="/signin">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>
        </Link>
      </div>
    );
};

export default Landing;