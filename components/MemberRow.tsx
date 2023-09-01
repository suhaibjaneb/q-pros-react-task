import { Member } from "@/lib/members";
import Link from "next/link";

interface MemberRowProps {
  order: number;
  memberData: Member;
  deleteUser: (id: string) => void;
}

export default function MemberRow({
  memberData,
  order,
  deleteUser,
}: MemberRowProps) {
  return (
    <tr>
      <th>{order}</th>
      <td>{memberData.name}</td>
      <td>{memberData.email}</td>
      <td>{memberData.team_role}</td>
      <td className="flex justify-center">
        <div className="btn-group">
          <Link
            href={{
              pathname: "/edit-page",
              query: { memberId: memberData.id },
            }}
          >
            <button className="btn bg-green-600 text-gray-50">Edit</button>
          </Link>
          <button
            onClick={() => deleteUser(memberData.id + "")}
            className="btn bg-red-600 text-gray-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
