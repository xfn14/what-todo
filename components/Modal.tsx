'use client'

import useModalStore from '@/store/ModalStore'
import useBoardStore from '@/store/BoardStore'
import { Transition, Dialog } from '@headlessui/react'
import { FormEvent, Fragment, useRef } from 'react'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'

function Modal() {
    const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal])
    const [image, setImage, newTaskInput, setNewTaskInput, newTaskType, addTask] = useBoardStore((state) => [
        state.image,
        state.setImage,
        state.newTaskInput,
        state.setNewTaskInput,
        state.newTaskType,
        state.addTask,
    ])

    const imagePickerRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!newTaskInput) return

        addTask(newTaskInput, newTaskType, image)

        setImage(null)
        closeModal()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="form" onSubmit={handleSubmit} onClose={closeModal} className="relative z-10">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-sm bg-black/50 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-300 pb-2">
                                    Add a task
                                </Dialog.Title>

                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={newTaskInput}
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        placeholder="Enter a task here..."
                                        className="w-full border border-gray-300 rounder-md outline-none p-5 bg-black/75"
                                    />
                                </div>

                                <TaskTypeRadioGroup />

                                <div className="mt-2">
                                    <button
                                        type="button"
                                        className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
                                        onClick={(e) => {
                                            imagePickerRef.current?.click()
                                        }}
                                    >
                                        <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                                        Upload Image
                                    </button>

                                    {image && (
                                        <Image
                                            alt="Uploaded Image"
                                            width={200}
                                            height={200}
                                            src={URL.createObjectURL(image)}
                                            className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                                            onClick={() => {
                                                setImage(null)
                                            }}
                                        />
                                    )}

                                    <input
                                        type="file"
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith('image/')) return
                                            setImage(e.target.files![0])
                                        }}
                                    />
                                </div>

                                <div className="py-4">
                                    <button
                                        type="submit"
                                        disabled={!newTaskInput}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-black/40 px-4 py-2 
                                        text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 
                                        focus-visible:ring-offset-2 disabled:bg-black disabled:text-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
