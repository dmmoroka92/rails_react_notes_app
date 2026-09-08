import { useEffect, useState } from "react"

export function useSearch(delay = 500) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const debounce = (callback: () => void) => {
    const timeoutId = setTimeout(callback, delay)

    return () => clearTimeout(timeoutId)
  }

  useEffect(() => {
    const cancelDebouncedSearch = debounce(() => {
      setDebouncedSearch(search)
    })

    return cancelDebouncedSearch
  }, [search, delay])

  return {
    search,
    debouncedSearch,
    setSearch,
  }
}