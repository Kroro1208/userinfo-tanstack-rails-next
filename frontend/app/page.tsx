"use client";
import { useQuery } from "@tanstack/react-query";
import endpoinsts from "./api/router/route";

export default function Home() {
  const { data, error, isPending } = useQuery({
    queryKey: ["getUsers"],
    queryFn: endpoinsts.users.getUsers
  });
  if(isPending) return <div>情報取得中...</div>
  if(error) return <div>エラーが発生しました: {error.message}</div>
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        Home
      </main>      
    </div>
  );
}
