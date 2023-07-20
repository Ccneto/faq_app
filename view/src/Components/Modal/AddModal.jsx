import React, { useState } from "react";
import AddForm from '../Forms/AddForm'
import "./modal.css";

export default function Modal(props) {
    const { db_entries } = props;
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-red py-2 px-4 border border-black-500 hover:border-transparent rounded">Add Topic</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <AddForm db_entries={db_entries} />
            <button className="close-modal" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}
    </>
  );
}