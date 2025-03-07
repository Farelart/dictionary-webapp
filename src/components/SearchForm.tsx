"use client";

import { BsSearch } from "react-icons/bs"
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const searchQuery = formData.get("search") as string
    router.push(`/?q=${searchQuery}`)
  }

  return (
    <form
        className="bg-gray-100 p-3 w-full rounded-lg flex items-center justify-between my-8"
        onSubmit={handleSubmit}
    >
        <input 
            type="text" 
            name="search"
            placeholder="Search for a word"
            className="outline-none w-full"
        />
        <button type="submit">
            <BsSearch size={15} color="#a084e8"/>
        </button>
    </form>
  )
}
