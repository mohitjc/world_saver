import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../api-client';
import { toast } from 'react-toastify';

const DeleteAccountModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useNavigate();
  const userid = localStorage?.getItem('userID');

  useEffect(() => {
    if (!userid) {
      toast.error('You must be logged in to delete your account');
      history('/signup');
    }
  }, [userid, history]);

  const closeModal = () => {
    setIsOpen(false);
    history('/profile');
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="text_modal">
              Are you sure you want to delete your account?
            </h1>
            <div className="btns_modal">
              <button
                type="button"
                className="btn-icon delit_btn"
                onClick={() => {
                  ApiClient.delete(
                    `https://endpoint.crowdsavetheworld.com/user/delete?id=${userid}`
                  ).then((res) => {
                    toast.success('Your account deleted successfully');
                    closeModal();
                  });
                }}
              >
                Yes
              </button>
              <button onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-in-out;
        }

        .modal-content {
          background-color: #fff;
          padding: 60px 30px;
          border-radius: 12px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          width: 100%;
          text-align: center;
          animation: scaleUp 0.3s ease-in-out;
        }
        .text_modal {
          font-size: 28px;
          line-height: 35px;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #333;
        }

        button {
          margin: 0 5px;
          padding: 12px 28px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        button:first-of-type {
          background-color: #e74c3c;
          color: white;
        }

        button:first-of-type:hover {
          background-color: #c0392b;
        }

        button:last-of-type {
          background-color: #95a5a6;
          color: white;
        }

        button:last-of-type:hover {
          background-color: #7f8c8d;
        }

        /* Animation styles */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteAccountModal;
