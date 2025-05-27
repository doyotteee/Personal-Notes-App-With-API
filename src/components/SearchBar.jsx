import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../contexts/LanguageContext';

function SearchBar({ keyword, setKeyword }) {
  const { t } = useContext(LanguageContext);

  return (
    <input
      type="text"
      placeholder={t('search')}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="search-bar"
    />
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
};

export default SearchBar;