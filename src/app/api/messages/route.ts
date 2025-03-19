// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import {
//   getMessagesByUserId,
//   deleteMessagesByUserId,
// } from "@/lib/message-service";

// interface ExtendedSession {
//   user: {
//     id: string;
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   };
// }

// export async function GET() {
//   try {
//     const session = (await getServerSession(authOptions)) as ExtendedSession;
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const messages = await getMessagesByUserId(session.user.id);
//     return NextResponse.json({ messages });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE() {
//   try {
//     const session = (await getServerSession(authOptions)) as ExtendedSession;
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await deleteMessagesByUserId(session.user.id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting messages:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
