import React, { useState } from 'react'
import axios from 'axios';


const Search = () => {
    const [email, setEmail] = useState("");
    function handleSubmit (e) {
        e.preventDefault();
        const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
        const localUrl = "http://localhost:3000";
        axios
          .post(herokuUrl+ "/search-by-email", email)
          .then(res => console.log (res.data))
          .catch(err => console.error(err));
    }

  return (
    <section>
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input 
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            />
            <button type='submit'> search </button>
        </form>
    </section>
  )
}

export default Search