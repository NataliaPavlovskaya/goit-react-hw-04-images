import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchForm.module.css';
// import {ToastContainer, toast } from 'react-toastify';

const SearchFrom = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    // Запрещает отправку пустого инпута
    if (!query.trim()) return;

    // Отдать данные внешнему компоненту
    onSearch(query);

    resetForm();
  };
 

// Сбрасывает поле отправки
  const resetForm = () => setQuery('');
  
  return (
  <form className={styles.SearchForm} onSubmit={handleFormSubmit}>
    <button type="submit" className={styles['SearchForm-button']}>
      <span className={styles['SearchForm-button-label']}>Search</span>
    </button>

    <input
      className={styles['SearchForm-input']}
      type="text"
      name="query"
      value={query}
      onChange={handleSearchInput}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>);
};

SearchFrom.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchFrom;





// class SearchFrom extends Component {
//   state = {
//     query: '',
//   };

  // handleSearchInput = e => {
  //   const { name, value } = e.currentTarget;

  //   this.setState({
  //     [name]: value,
  //   });
  // };

  // handleFormSubmit = e => {
  //   e.preventDefault();

  //   // Запрещает отправку пустого инпута
  //   if (!this.state.query) return;
    

  //   // if(this.state.query.trim()=== ''){
  //   //   return toast.error('Введите запрос!')
  //   // }

  //   // Отдать данные внешнему компоненту
  //   this.props.onSearch(this.state.query);

  //   this.resetForm();
  // };

  // resetForm = () =>
  //   this.setState({
  //     query: '',
  //   });

//   render() {
//     return (
//         <>
//       <form className={styles.SearchForm} onSubmit={this.handleFormSubmit}>
//         <button type="submit" className={styles['SearchForm-button']}>
//           <span className={styles['SearchForm-button-label']}>Search</span>
//         </button>

//         <input
//           className={styles['SearchForm-input']}
//           type="text"
//           name="query"
//           value={this.state.query}
//           onChange={this.handleSearchInput}
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//       {/* <ToastContainer autoClose={2000}/> */}
//       </>
//     );
//   }
// }

