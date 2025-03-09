import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import React from "react";

export default async function Admin() {
  const post = await db.query.postsTable.findMany();
  return (
    <div className="min-w-3xl mx-auto">
      <form
        action={async () => {
          "use server";
          await db.insert(usersTable).values({
            id: 1,
            age: 20,
            email: "test@gmail.com ",
            name: "john",
          });
          await db
            .insert(postsTable)
            .values({ title: "Hello", content: "World", userId: 1 });
        }}
      >
        <button type="submit" className="p-3 bg-blue-500 text-white">
          Submit
        </button>
      </form>

      {post.map((p) => (
        <div key={p.id}>
          <h1>{p.title}</h1>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
