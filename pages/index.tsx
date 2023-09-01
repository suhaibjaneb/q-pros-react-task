import { Inter } from "next/font/google";
import MemberTable from "@/components/MemberTable";
import { Member } from "@/lib/members";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { APIs } from "@/lib/urls";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  data: Member[];
}

export default function Home({ data }: HomeProps) {
  const { data: members, mutate } = useSWR(APIs.members, fetcher, {
    fallbackData: data,
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-emerald-50 ${inter.className}`}
    >
      <MemberTable data={members} mutate={mutate} />
    </main>
  );
}

export async function getServerSideProps() {
  const data = await (await fetch(APIs.members)).json();
  return {
    props: {
      data: data || [],
    },
  };
}
