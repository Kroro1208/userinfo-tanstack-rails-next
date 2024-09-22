"use client"

import endpoints from "@/app/api/users/route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UserState {
    name: string;
    email: string;
}

const defaultUserState: UserState = {
    name: "",
    email: ""
}

interface UserPageProps {
    params: {
        userId: number
    }
}

const UserPage = ({ params }: UserPageProps) => {
    const { userId } = params;
    const [userState, setUserState] = useState(defaultUserState);
    const { name, email } = userState;

    const queryClient = useQueryClient();
    const { data, isPending, error, status } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: () => endpoints.getUser(userId)
    });

    const updateMutation = useMutation({
        mutationFn: endpoints.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getUser", userId] })
        }
    });

    useEffect(() => {
        if(status === "success" && data) {
            setUserState({
                name: data.name || "",
                email: data.email || "",
            })
        }
    }, [status, data]);

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">{data?.name}の編集</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">名前</label>
                    <input
                        id="name"
                        value={name}
                        type="text"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setUserState((prevState) => ({
                            ...prevState,
                            name: e.target.value
                        }))}/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">メールアドレス</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setUserState((prevState) => ({
                            ...prevState,
                            email: e.target.value
                        }))}
                    />
                </div>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={(e) => {
                        e.preventDefault();
                        updateMutation.mutate({
                            id: userId,
                            name,
                            email
                        })
                    }}>
                    保存
                </button>
            </form>
        </main>
    )
}

export default UserPage