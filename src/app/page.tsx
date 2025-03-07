import { BsBook, BsMoon } from "react-icons/bs"
import WordResults from "@/components/WordResults"
import SearchForm from "@/components/SearchForm"

type HomeProps = {
  searchParams: Promise<{q?: string}>
}

export default async function Home({searchParams}: HomeProps) {
  const params = await searchParams
  const query = params.q || "keyboard"

  return (
    <main className="w-[85%] md:w-[70%] mx-auto">
      <nav className="flex justify-between my-8">
        <BsBook size={30} color="gray" />
        <BsMoon size={20} color="gray"/>
      </nav>
      
      <SearchForm />

      <WordResults query={query}/>
    </main>
  )
}
