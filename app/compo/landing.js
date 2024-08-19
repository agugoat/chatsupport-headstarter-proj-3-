import Link from 'next/link';

const Landing = () => {
    return (
      <div>
        <h1>AI Assistant</h1>
        <p>Use next-generation LLM technology to improve your productivity!</p>

        <Link href="/signin">
          <button> Sign Up </button>
        </Link>
      </div>
    );
};

export default Landing;