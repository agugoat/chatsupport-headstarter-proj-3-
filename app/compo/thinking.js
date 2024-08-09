const Thinking = () => {
    return (
      <div className="flex items-center my-2">
        <div className="avatar">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center">
            🤖 {/* Using an emoji for the AI avatar */}
          </div>
        </div>
        <div className="ml-2 p-2 bg-gray-100 rounded-lg animate-pulse">
          Thinking...
        </div>
      </div>
    );
  };
  
  export default Thinking;