import { useState, useEffect } from 'react';

import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from './components/Modal/Modal';
import Loader from 'components/Loader';
import Message from 'components/Message';
import IconButton from 'components/IconButton';
import { ReactComponent as CloseIcon } from './Icons/close.svg';

import fetchImages from './api/Api.js'

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);

  // Запрос за картинками при обновлении инпута
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  const onChangeQuery = query => {
      setImages([]);
      setPage(1);
      setQuery(query);
      setLoading(false);
      setModal(false);
      setlargeImage('');
      setError(null)
    };

  // Получаем дату из фетча
  const getImages = async () => {
    setLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      setImages(prev => [...prev, ...hits]);

      setPage(prevPage => prevPage + 1);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      // ошибка 
      setError({ error });
    } finally {
      // загрузка
      setLoading(false);
    }
  };

  // Получает полное изображение, пишет его в стейт и открывает модалку
  const handleGalleryItem = fullImageUrl => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  // Переключение модалки
  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  // Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  // Доп проверка
  const needToShowLoadMore = images.length > 0 && images.length >= 12;

  return (
    <>
      <SearchBar onSearch={onChangeQuery} />

        {images.length < 1 && (
          <Message>
            <h2>The gallery is empty 🙁</h2>
            <p>Use search field!</p>
          </Message>
        )}

        <ImageGallery images={images} onImageClick={handleGalleryItem} />

        {needToShowLoadMore && <Button onClick={getImages} />}

        {showModal && (
          <Modal onClose={toggleModal}>
           <div className="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal">
            <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </div>

          <img src={largeImage} alt="img" className="Modal-image" />          </Modal>
        )}

        {isLoading && <Loader />}

        {error && (
          <Message>
            <h2>Oops! 😫</h2>
            <p>
              Sorry, something went wrong. Please try again, or{' '}
              <a href="/">refresh the page</a>.
            </p>
          </Message>
        )}
      </>
    );
  }


export default App;




// class App extends Component {
//     state = {
//       images: [],
//       currentPage: 1,
//       searchQuery: '',
//       isLoading: false,
//       showModal: false,
//       largeImage: '',
//       error: null,
//     };
  
//     // Если при обновлении запрос не равен между стейтами, тогда делаем фетч
//     componentDidUpdate(prevProps, prevState) {
//       if (prevState.searchQuery !== this.state.searchQuery) {
//         this.getImages();
//       }
//     }
  
//     // Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки ключи из стейта
//     onChangeQuery = query => {
//       this.setState({
//         images: [],
//         currentPage: 1,
//         searchQuery: query,
//         error: null,
//       });
//     };
  
//     // Получаем дату из фетча
//     getImages = async () => {
//       const { currentPage, searchQuery } = this.state;
  
//       this.setState({
//         isLoading: true,
//       });
  
//       try {
//         const { hits } = await fetchImages(searchQuery, currentPage);
  
//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           currentPage: prevState.currentPage + 1,
//         }));
  
//         if (currentPage !== 1) {
//           this.scrollOnLoadButton();
//         }
//       } catch (error) {
//         // ошибка 
//         this.setState({ error });
//       } finally {
//         // загрузка
//         this.setState({
//           isLoading: false,
//         });
//       }
//     };
  
//     // Получает полное изображение, пишет его в стейт и открывает модалку
//     handleGalleryItem = fullImageUrl => {
//       this.setState({
//         largeImage: fullImageUrl,
//         showModal: true,
//       });
//     };
  
//     // Переключение модалки
//     toggleModal = () => {
//       this.setState(prevState => ({
//         showModal: !prevState.showModal,
//         largeImage: '',
//       }));
//     };
  
//     // Скролл при клике на кнопку
//     scrollOnLoadButton = () => {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     };
  
//     render() {
//       const { images, isLoading, showModal, largeImage, error } = this.state;
//       const needToShowLoadMore = images.length > 0 && images.length >= 12; // Нужны доп проверки;
  
//       return (
//         <>
//           <SearchBar onSearch={this.onChangeQuery} />
  
//           {images.length < 1 && (
//             <Message>
//               <h2>The gallery is empty 🙁</h2>
//               <p>Use search field!</p>
//             </Message>
//           )}
  
//           <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
  
//           {needToShowLoadMore && <Button onClick={this.getImages} />}
  
//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//              <div className="Close-box">
//               <IconButton onClick={this.toggleModal} aria-label="Close modal">
//               <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
//               </IconButton>
//             </div>

//             <img src={largeImage} alt="img" className="Modal-image" />          </Modal>
//           )}
  
//           {isLoading && <Loader />}
  
//           {error && (
//             <Message>
//               <h2>Oops! 😫</h2>
//               <p>
//                 Sorry, something went wrong. Please try again, or{' '}
//                 <a href="/">refresh the page</a>.
//               </p>
//             </Message>
//           )}
//         </>
//       );
//     }
//   }
  
//   export default App;