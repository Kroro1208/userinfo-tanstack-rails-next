"use client"
import endpoinsts from "@/app/api/router/route";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react"

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
        mutationFn: endpoinsts.users.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getUsers"]
            })
            router.push('/');
        }
    })
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center p-24">
      <h1>New User</h1>
      <form className="rounded-xl bg-gray-900 p-4 flex flex-col gap-2 justify-center w-72">
        <div className="flex flex-col">
          <label htmlFor="name">名前</label>
          <input type="text" value={name} onChange={(e) => setUserState((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))} />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email">メールアドレス</label>
          <input type="text" value={email} onChange={(e) => setUserState((prevState) => ({
            ...prevState,
            email: e.target.value,
          }))} />
        </div>
        <button type="button" onClick={(e) => {
          e.preventDefault()
          createMutation.mutate({
            email,
            name,
          })
        }}>
          Save
        </button>
      </form>
    </main>
  )
}

export default CreateUserPage
