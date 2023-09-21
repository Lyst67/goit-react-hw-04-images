import React, {useState, useEffect} from "react";
import { Searchbar }  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImageBySearch } from "api/api";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import css from "./App.module.css"

export function App() {
  const [gallery, setGallery] = useState([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isButton, setIsButton] = useState(false)

  const handleSetSearchQuery = (value) => {
    setQuery(value)
    setGallery([])
      setPage(1)
  }

   const handleLoadMore = () => {
          setPage(prev => prev + 1) 
      } 
 
 useEffect(() => {
   if (!query) { return }

     const fetchImages = async (page, query) => {
          setIsLoading(true)
          setIsButton(false)
        try {
          const data = await getImageBySearch(query, page) 
          if (!data.hits.length) {
              alert('Opps! There are no images for your request! Please try again!')
           return  
            }
          setGallery(prev => [...prev, ...data.hits])  
          setIsButton(page < Math.ceil(data.totalHits / 12))
        } catch (error) { setError(error.response.data)} 
        finally {
            setIsLoading(false)
        }
    }
  fetchImages(page, query)
  }, [ page, query]);
  
     return (
       <div className={css.app}>
         <Searchbar onSubmit={handleSetSearchQuery} />
         {error && <h1>{error}</h1>}
         {isLoading && ( <Loader/>)}
         <ImageGallery gallery={gallery} />
         {isButton && (<Button handleLoadMore={handleLoadMore} />)} 
    </div>
  );
  }
 


