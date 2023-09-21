import React, { useEffect} from "react"
import css from "./Modal.module.css"

export function Modal({ onShowModal, largImg, tags }) {
   
  useEffect(() => {
     function handleKeydown(event) {
     if (event.code === "Escape")
      onShowModal()
  }
     window.addEventListener("keydown", handleKeydown)
     return () => {
       window.removeEventListener("keydown", handleKeydown)
     }
   }, [onShowModal]) 
   
    const handleOvarlayClick = (event) => {
     if (event.target === event.currentTarget) {
       onShowModal()
     }
   }
   
     return (
        <div className={css.overlay} onClick={handleOvarlayClick}>
  <div className={css.modal}>
    <img src={largImg} alt={tags} />
        </div>
        <button type="button" className={css.modal_btn} onClick={onShowModal}>X</button>
</div>
    )
}
 
   

