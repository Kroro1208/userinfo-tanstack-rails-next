"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import HomeImg from "../../homeImg.png";
import { Trash2 } from 'lucide-react';
import endpoints from "./api/users/route";

export default function Home() {
  const { data, refetch, error, isPending } = useQuery({
    queryKey: ["getUsers"],
    queryFn: endpoints.getUsers
  });

  const deleteMutation = useMutation({
    mutationFn: endpoints.deleteUser,
    onSuccess: () => refetch()
  });

  if (isPending) return <div className="flex justify-center items-center min-h-screen">情報取得中...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error.message}</div>

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="bg-slate-300 rounded-full p-4 mb-8 shadow-lg">
        <Image alt="homeImage" src={HomeImg} width={350} height={350} className="rounded-full"/>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">ユーザー一覧</h2>
        <ul className="divide-y divide-gray-200">
          {data?.map((user) => (
            <li className="flex items-center py-4" key={user.id}>
              <Link href={`/users/${user.id}`} className="text-blue-600 hover:text-blue-800 font-medium w-1/3">
                {user.name}
              </Link>
              <span className="text-gray-600 w-1/2">{user.email}</span>
              <div className="w-1/6 flex justify-end">
                <button
                  type="button"
                  onClick={() => deleteMutation.mutate(user)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/user/create"
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        新規ユーザー追加
      </Link>
    </main>
  );
}