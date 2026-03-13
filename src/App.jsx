import { useState } from 'react'
function App() {
  //Search bar, starts empty and updates useState when neccessary.
  const [query, setQuery] = useState('')
  //When the search is sent, a list of animes will show up in an array.
  const [results, setResults] = useState([])
  //async to hold the data for a moment so the app won't run before the data is called.
  const searchAnime = async () => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
    const data = await response.json()
    console.log(data.data)
    setResults(data.data)
  }
  return (
    <div>
        <h1>Anime Search</h1>
        <input 
          value={query}
          //when something is searched, the event(e) will update the value for the query
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime"
          //results show up in list. map loops through every anime result in the array and returns JSX for each
        //key keeps track of each item in the list with a unique key
        />
        <button onClick={searchAnime}>Search</button>
        {results.map((anime) => (
          <div key={anime.mal_id}>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <h2>{anime.title}</h2>
            <p>{anime.synopsis}</p>
          </div>
        ))}
    </div>
  )
}

export default App