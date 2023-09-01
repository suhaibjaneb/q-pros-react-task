import sql from "./db";

export interface Member {
  id: number;
  title: string;
  name: string;
  email: string;
  team_role: string;
  start_date: string;
  end_date: string;
}

export async function list() {
  return await sql<Member[]>`
    SELECT id, title, name, email, start_date, end_date, team_role FROM members
    ORDER BY id
  `;
}

export async function getOne(id: string) {
  return await sql<Member[]>`
    SELECT id, title, name, email, start_date, end_date, team_role FROM members WHERE id=${id}
    ORDER BY id
  `;
}

export async function create(members: Member) {
  return await sql<Member[]>`
    INSERT INTO members (title, name, email, team_role, start_date, end_date) VALUES (${members.title}, ${members.name}, ${members.email}, ${members.team_role}, ${members.start_date}, ${members.end_date})
    RETURNING *
  `;
}

export async function update(members: any) {
  return await sql<Member[]>`
    UPDATE members SET ${sql(
      members,
      "title",
      "email",
      "name",
      "team_role",
      "start_date",
      "end_date"
    )} WHERE id=${members.id}
    RETURNING *
  `;
}

export async function remove(members: Member) {
  return await sql<Member[]>`
    DELETE FROM members WHERE id=${members.id}
    RETURNING id
  `;
}
