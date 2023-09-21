import React, {useState} from "react";
import css from "./Searchbar.module.css"

export function Searchbar({onSubmit}) {
const [value, setValue] = useState("")
       
  const handleChange = ({ target: { value } }) => {
    setValue(value)

    }

  const handleSubmitSearch = (event) => {
    event.preventDefault()
    if (value === "") {
      alert("Fill in the field, please!")
      return
    }
    onSubmit(value.toLowerCase().trim()) 
}
  
 return (
   <header className={css.searchbar}>
      <form className={css.form} autoComplete="on"
             onSubmit={handleSubmitSearch }
         >
         <button type="submit" className={css.search_button}></button>
         <input
           className={css.input}
           type="text"
           onChange={handleChange}
           autoComplete="off"
           autoFocus
           placeholder="Search images and photos"
         />
      </form>
    </header>
    )
    }

 
