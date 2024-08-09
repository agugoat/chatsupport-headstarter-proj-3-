import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Setting = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const storedKey = window.localStorage.getItem('api-key');
    if (storedKey) {
      setApiKey(storedKey);
      setInput(storedKey);
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Simulate an API key validation process
      await validateApiKey(input);
      window.localStorage.setItem('api-key', input);
      setApiKey(input);
      if (onSave) onSave(input); // Callback function if provided
    } catch (error) {
      setErrorMsg('Invalid API key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    window.localStorage.removeItem('api-key');
    setApiKey('');
    setInput('');
  };

  const validateApiKey = async (key) => {
    // Simulate API key validation (replace with real validation if necessary)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (key.trim().length > 0) {
          resolve(true);
        } else {
          reject(new Error('Invalid API key'));
        }
      }, 500);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-2">
        <label className="font-semibold">API Key</label>
        <input
          type="password"
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your API key"
        />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            className={`btn btn-primary ${loading && 'loading'}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          {apiKey && (
            <button
              type="button"
              className="btn btn-error"
              onClick={handleRemove}
            >
              Remove Key
            </button>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm">
        Your API key is stored locally in your browser.
      </p>
    </div>
  );
};

Setting.propTypes = {
  onSave: PropTypes.func,
};

export default Setting;