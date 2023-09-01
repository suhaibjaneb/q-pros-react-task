import { Member } from "@/lib/members";
import { APIs } from "@/lib/urls";
import MemberRow from "./MemberRow";
import { KeyedMutator } from "swr";

interface MemberTableProps {
  data: Member[];
  mutate: KeyedMutator<any>;
}

export default function MemberTable({ data, mutate }: MemberTableProps) {
  const deleteUser = (id: string) => {
    fetch(APIs.members, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => mutate());
  };

  return (
    <table className="table bg-emerald-800 shadow-lg shadow-black">
      <thead className="text-emerald-50">
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((user: Member, index: number) => (
          <MemberRow
            key={user.id}
            memberData={user}
            order={index + 1}
            deleteUser={deleteUser}
          />
        ))}
      </tbody>
    </table>
  );
}
