import React, {useState} from "react";
import { Modal } from "components/Modal/Modal";
import css from "./ImageGalleryItem.module.css"

export function ImageGalleryItem({ image }) {
    const [showModal, setShowModal] = useState(false)
 
    const toggleModal = () => {
        setShowModal(!showModal)
    } 

        const {previewURL, largeImageURL, tags, id} = image
        return (
            <>
                <li key={id} className={css.gallery_item} onClick={toggleModal} >
                <img className={css.item_image} src={previewURL}  alt={tags} />
                </li>
                { showModal && (<Modal onShowModal={toggleModal} largImg={largeImageURL} tags={tags} />) }
            </>
           
            
        ) 
    }
   

