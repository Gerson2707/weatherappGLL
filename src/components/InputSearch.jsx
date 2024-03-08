import { useRef } from "react"
import "./styles/InputSearch.css"

const InputSearch = ( {setInputValue} ) => {
    const inputValue = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        setInputValue(inputValue.current.value.trim())
    }

    return (
      <form onSubmit={handleSubmit} className="input-search-container">
        <input
          ref={inputValue}
          type="text"
          placeholder="Enter city name"
          className="input-search"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    );
  };
export default InputSearch