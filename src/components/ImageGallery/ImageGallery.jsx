import React from "react"
import  ImageGalleryItem  from "../ImageGalleryItem/ImageGalleryItem"

import css from './ImageGallery.module.css'

export const ImageGallery = ({gallery}) => {

        return (
            <div > 
                <ul className={css.image_gallery}>
                    {gallery.map((image) => (
                < ImageGalleryItem image={image} key={image.id} />
            ))}
                </ul>
                 
           </div> 
    )  
    } 


