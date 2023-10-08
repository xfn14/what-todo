import openai from '@/openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { todos } = await request.json()
    console.log(todos)

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.9,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content:
                    'When responding, welcome the user and say welcome to the What-Todo app. \
                    Limit the response to 200 characters.',
            },
            {
                role: 'user',
                content: `Hi there, provide a summary of the following todos. 
                Count how many todos are in each category, 
                and tell me what I should do! Here's the data: ${JSON.stringify(todos)}`,
            },
        ],
    })

    console.log(response)
    console.log(response.choices[0].message)

    return NextResponse.json(response.choices[0].message)

    return NextResponse.json(response)
}
