import { Inter } from "next/font/google";
import TextInput from "@/components/TextInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Member } from "@/lib/members";
import { APIs } from "@/lib/urls";

const inter = Inter({ subsets: ["latin"] });

interface EditPageProps {
  memberId: string;
  member: Member;
}

export default function Edit({ memberId, member }: EditPageProps) {
  const router = useRouter();
  const [hasMemberId, setHasMemberId] = useState(!!memberId);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    id: -1,
    title: "",
    name: "",
    email: "",
    start_date: new Date().toISOString().substring(0, 10),
    end_date: new Date().toISOString().substring(0, 10),
    team_role: "",
  });

  useEffect(() => {
    const { start_date, end_date, title, name, email, team_role } = data;
    if (
      start_date < end_date &&
      title?.length > 0 &&
      name?.length > 0 &&
      email?.length > 0 &&
      team_role?.length > 0 &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [data]);

  useEffect(() => {
    if (hasMemberId) {
      setHasMemberId(false);
      setData((prev) => ({ ...prev, ...member }));
    }
  }, [hasMemberId, member]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prev: Member) => {
      return { ...prev, [name]: value };
    });
  };

  const validateForm = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(APIs.members, {
      method: !!memberId ? "PUT" : "POST",
      body: JSON.stringify({
        ...(!!memberId && { id: data.id }),
        email: data.email,
        name: data.name,
        title: data.title,
        start_date: data.start_date,
        end_date: data.end_date,
        team_role: data.team_role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => {
        router.push("/");
      });
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-emerald-50 ${inter.className}`}
    >
      <form
        className="bg-emerald-800 shadow-lg shadow-black p-4 flex flex-wrap"
        onSubmit={validateForm}
      >
        <TextInput
          label="Title"
          value={data.title}
          onChange={handleInputChange}
        />
        <TextInput
          label="Name"
          value={data.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email"
          value={data.email}
          type="email"
          onChange={handleInputChange}
        />
        <label className="input-group w-fit min-w-[30%] m-4">
          <span className="bg-emerald-950 w-[35%]">Role</span>
          <select
            name="team_role"
            className="select max-w-xs bg-emerald-100 text-black w-[65%]"
            value={data?.team_role || ""}
            onChange={handleInputChange}
          >
            <option value="" disabled selected className="hidden">
              Select Role
            </option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="readOnly">Read Only</option>
          </select>
        </label>
        <label className="input-group w-fit min-w-[30%] m-4">
          <span className="bg-emerald-950 w-[35%]">Start Date</span>
          <input
            type="date"
            name="start_date"
            value={new Date(data.start_date).toISOString().substring(0, 10)}
            onChange={handleInputChange}
            className="input dark:[color-scheme:dark] color-scheme:dark input-bordered w-[65%] bg-emerald-100 text-black	"
          />
        </label>
        <label className="input-group w-fit min-w-[30%] m-4">
          <span className="bg-emerald-950 w-[35%]">End Date</span>
          <input
            type="date"
            name="end_date"
            value={new Date(data.end_date).toISOString().substring(0, 10)}
            onChange={handleInputChange}
            className="input w-[65%] input-bordered bg-emerald-100 text-black	"
          />
        </label>

        <input
          type="submit"
          value={memberId ? "Update" : "Save"}
          className="btn bg-gray-700 text-white w-full"
          disabled={isDisabled}
        />
      </form>
    </main>
  );
}

interface serverData {
  query: { memberId: string };
}

export async function getServerSideProps(context: serverData) {
  let data;
  if (context.query?.memberId) {
    data = await (
      await fetch(`${APIs.member}?id=${context.query?.memberId}`)
    ).json();
  }

  return {
    props: {
      member: data?.[0] || {},
      memberId: context.query?.memberId || "", //pass it to the page props
    },
  };
}
