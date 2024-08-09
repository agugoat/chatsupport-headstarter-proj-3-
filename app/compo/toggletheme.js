import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ToggleTheme = ({ open }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme in local storage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme); // Save the user's preference
  };

  return (
    <button
      onClick={handleToggle}
      className="btn btn-outline w-full"
    >
      {theme === 'light' ? '🌞 Light Mode' : '🌜 Dark Mode'}
      {open && <span className="ml-2">{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>}
    </button>
  );
};

ToggleTheme.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ToggleTheme;