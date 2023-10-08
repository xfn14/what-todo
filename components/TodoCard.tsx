'use client'

import useBoardStore from '@/store/BoardStore'
import { Todo, TypedColumn } from '@/typings'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'

type Props = {
    todo: Todo
    index: number
    id: TypedColumn
    innerRef: (element: HTMLElement | null) => void
    draggableProps: DraggableProvidedDraggableProps
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
    const deleteTask = useBoardStore((state) => state.deleteTask)

    return (
        <div
            className="backdrop-blur-sm bg-black/50 rounded-md space-y-2 drop-shadow-md"
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
        >
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>

                <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
                    <XCircleIcon className="ml-5 h-8 w-8" />
                </button>
            </div>
        </div>
    )
}

export default TodoCard
