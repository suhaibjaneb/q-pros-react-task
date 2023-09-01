exports.up = async function (sql) {
  await sql`
        CREATE TABLE IF NOT EXISTS members (
            id SERIAL PRIMARY KEY NOT NULL,
            title CHARACTER VARYING(255) NOT NULL,
            name CHARACTER VARYING(255) NOT NULL,
            email CHARACTER VARYING(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            team_role CHARACTER VARYING(255) NOT NULL
        )
      `;
};

exports.down = async function (sql) {
  await sql`
        DROP TABLE IF EXISTS members
      `;
};
