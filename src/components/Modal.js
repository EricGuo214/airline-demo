import React from 'react';

function Modal({ title, children, onClose }) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h3>{title}</h3>
          {children}
          <button
            type="button"
            className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

export default Modal;