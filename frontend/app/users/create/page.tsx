"use client"
import endpoints from "@/app/lib/api/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { UserPlus } from 'lucide-react';

const defaultUserState = {
    name: "",
    email: ""
}

const CreateUserPage = () => {
    const [userState, setUserState] = useState(defaultUserState);
    const { name, email } = userState;
    const router = useRouter();
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: endpoints.users.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getUsers"]
            })
            router.push('/');
        }
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <UserPlus className="mr-3" size={24} />
                        新規ユーザー登録
                    </h2>
                </div>
                <form className="px-8 py-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">名前</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setUserState(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            placeholder="例：山田 太郎"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setUserState(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                createMutation.mutate({ email, name })
                            }}
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            登録する
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateUserPage