'use client'

import Image from 'next/image'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import useBoardStore from '@/store/BoardStore'
import { useEffect, useState } from 'react'
import fetchSuggestion from '@/lib/fetchSuggestion'

function Navbar() {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString,
    ])

    const [loading, setLoading] = useState<boolean>(false)
    const [suggestion, setSuggestion] = useState<string>('')

    useEffect(() => {
        if (board.columns.size === 0) return
        setLoading(true)

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board)
            setSuggestion(suggestion)
            setLoading(false)
        }

        fetchSuggestionFunc()
    }, [board])

    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 rounded-b-2xl">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-red-800 to-[#b7730e71] rounded-md filter blur-3xl opacity-50 -z-50" />

                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={200}
                    height={850}
                    className="w-60 md:w-72 pb-10 md:pb-0 object-contain"
                />

                <div className="flex items-center space-x-5 flex-1 justify-end w-full">
                    <form className="text-white flex items-center space-x-5 backdrop-blur-sm bg-black/50 rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none p-2 bg-black/75"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>

                    <Avatar name="André Vaz" round size="50" color="#991b1b" />
                </div>
            </div>

            <div className="flex items-center justify-center px-5 py-2 md:py-5">
                <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit backdrop-blur-sm bg-black/50 italic max-w-3xl">
                    <UserCircleIcon
                        className={`inline-block h-10 w-10 text-red-800 mr-1 
                        ${loading && 'animate-spin'}
                    `}
                    />
                    {suggestion && !loading ? suggestion : 'GPT is summarising your tasks for the day...'}
                </p>
            </div>
        </header>
    )
}

export default Navbar
