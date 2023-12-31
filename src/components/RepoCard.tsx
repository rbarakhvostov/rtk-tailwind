import { useState } from "react"
import { useActions } from "../hooks/useActions"
import { useAppSelector } from "../hooks/useAppSelector"
import { IRepo } from "../models/models"

export function RepoCard({ repo }: {repo: IRepo}) {
  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector(state => state.github)

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

  const addToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addFavourite(repo.html_url)
    setIsFav(true)
  }

  const removeFromFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    removeFavourite(repo.html_url)
    setIsFav(false)
  }

  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFav && <button
          className="px-4 py-2 mr-2 bg-yellow-400 rounded hover: shadow-md transition-all"
          onClick={addToFavourites}
        >
          Add
        </button>}
        {isFav && <button
          className="px-4 py-2 bg-blue-400 rounded hover: shadow-md transition-all"
          onClick={removeFromFavourites}
        >
          Remove
        </button>}
      </div>
    </a>
  )
} 