import { Component } from "react";
import  Searchbar  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImageBySearch } from "api/api";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import css from "./App.module.css"

class App extends Component {
  state = {
    gallery: [], query: "", page: 1,
    isLoading: false, error: false, isButton: false
  }
  
  componentDidUpdate(_, prevState) {
        if (this.state.query === "") {
            alert("Fill in the field, please!")
            return
        }
        if (prevState.query !== this.state.query) {
          this.setState({ page: 1, gallery: [] })
           if (this.state.page === 1) {
        this.fetchImages();
      }
        } else {
            if (prevState.page !== this.state.page)
            {this.fetchImages()} 
          }  
     }
  
    fetchImages = async () => {
        try {
             this.setState({ isLoading: true })
          const data = await getImageBySearch(this.state.query, this.state.page) 
            if (data.hits.length === 0) {
              alert('Opps! There are no images for your request! Please try again!')
           return  
            }

          this.setState((prev) => ({
            gallery: [...prev.gallery, ...data.hits],
            isButton: [...prev.gallery, ...data.hits].length < data.totalHits,
          })) 
            // if ([...this.state.gallery, ...data.hits].length >= data.totalHits)
            //  { this.setState({ isButton: false })
            //     return
            // }   
        } catch (error) { this.setState({ error: error.response.data })} 
        finally {
            this.setState({ isLoading: false})
        }
    }
  
  handleSetSearchQuery = (value) => {
    this.setState({ query: value })
  }
  
   handleLoadMore = () => {
          this.setState(prevState => ({
      page: prevState.page + 1,
    }))  
    }

  render() {
    const {isLoading, error, isButton } = this.state
     return (
       <div className={css.app}>
         <Searchbar onSubmit={this.handleSetSearchQuery} />
         {error && <h1>{error}</h1>}
         {isLoading && ( <Loader/>)}
         <ImageGallery gallery={this.state.gallery} />
         {isButton && (<Button handleLoadMore={this.handleLoadMore} />)} 
    </div>
  );
  }
 
};

export default App