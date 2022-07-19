import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import  styles from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({onClose, children}) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      });

      // закритие окна по Escape;
const handleKeyDown = e => {
    if (e.code === 'Escape') {
    onClose();
    }
};

// закритие окна по клику на Backdrop;
const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
    onClose();
    }
}

return createPortal (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot ,
)
}

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
  
export default Modal;



// class Modal extends Component{
// // слушатели;
// componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
// }
// componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
// }

// // закритие окна по Escape;
// handleKeyDown = e => {
//     if (e.code === 'Escape') {
//         this.props.onClose();
//     }
// };

// // закритие окна по клику на Backdrop;
// handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//         this.props.onClose();
//     }
// }

// render() {
//     return createPortal (
//         <div className={styles.Overlay} onClick={this.handleBackdropClick}>
//             <div className={styles.Modal}>
//                 {this.props.children}
//             </div>
//         </div>,
//         modalRoot ,
// )}
// }

// Modal.defaultProps = {
//   children: null,
// };

// Modal.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };
  
// export default Modal;


