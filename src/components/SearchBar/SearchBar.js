import React from 'react'
import PropTypes from 'prop-types';
import SearchFrom from 'components/SearchForm';


import styles from './Search.module.css';


const SearchBar = ({ onSearch }) => (
    <header className={styles.Searchbar}>
      <SearchFrom onSearch={onSearch} />
    </header>
  );
  
  SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  
  export default SearchBar;




