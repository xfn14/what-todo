import { Board } from '@/typings'
import formatTodosForAI from './formatTodosForAI'

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board)
    console.log('Formated TODOs to send:' + todos)

    const response = await fetch('/api/generateSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todos }),
    })

    const data = await response.json()
    const { content } = data

    return content
}

export default fetchSuggestion
