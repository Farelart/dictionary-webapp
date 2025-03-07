import { BsPlayFill } from "react-icons/bs"
import Link from "next/link"

type WordResultsProps = {
    query: string
}

type DictionaryDefinition = {
    definition: string;
    example?: string;
}

type DictionaryMeaning = {
    partOfSpeech: string;
    definitions: DictionaryDefinition[];
    synonyms?: string[];
}

type DictionaryEntry = {
    word: string;
    phonetic: string;
    meanings: DictionaryMeaning[];
    sourceUrls: string[];
}

export default async function WordResults({query}: WordResultsProps) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    const data = await response.json() as DictionaryEntry[]
    const {word, phonetic, meanings, sourceUrls} = data[0]

    return (
        <section className="flex flex-col gap-4 my-8">
            <article className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">{word}</h1>
                    <p className="text-[#a084e8]">{phonetic}</p>
                </div>
                <div>
                    <button className="bg-[#d4c5fa] rounded-full p-2">
                        <BsPlayFill size={20} color="#7057af"/>
                    </button>
                </div>
            </article>

            <div>
                <article className="flex flex-col gap-4">
                    {meanings.map((meaning, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <h2>{meaning.partOfSpeech}</h2>
                            <div>
                                <h3 className="font-mono text-gray-500 mb-4">Meaning</h3>
                                <ul className="list-disc list-inside ml-8 font-light">
                                    {meaning.definitions.map((definition,index) => (
                                        <li key={index}>{definition.definition}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-4">
                                {meaning.synonyms && meaning.synonyms.length > 0 ? (
                                    <div className="flex gap-4">
                                        <h3 className="font-mono text-gray-500">Synonyms</h3>
                                        <span className="text-[#a084e8]">{meaning.synonyms.join(", ")}</span>
                                    </div>
                                ) : ("")}                            
                            </div>
                        </div>
                    ))}
                </article>
            </div>

            <hr className="text-gray-400"/>

            {sourceUrls && sourceUrls.length > 0 && (
                <div className="flex gap-4">
                    <h3 className="font-mono text-gray-500">Sources</h3>
                    {sourceUrls.map((url, index) => (
                        <Link
                            key={index}
                            href={url}
                            target="_blank"
                            className="text-[#a084e8] hover:underline"
                        >
                            {url}
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}
