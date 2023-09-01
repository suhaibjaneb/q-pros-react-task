import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar absolute justify-between bg-emerald-950 text-emerald-50">
      <Link href="/">
        <span className="font-mono text-2xl italic font-bold">
          SJ React task
        </span>
      </Link>
      <div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Members List
        </Link>
        <Link href="/edit-page" className="btn btn-ghost normal-case text-xl">
          Add Member
        </Link>
      </div>
    </div>
  );
}
