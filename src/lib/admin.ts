import { db } from "@/db";

// Initialize Turso client

// export async function getDashboardStats() {
//   try {
//     // Get total users
//     const usersResult = await db.execute({
//       sql: "SELECT COUNT(*) as count FROM users",
//       args: [],
//     });

//     const totalUsers = usersResult.rows[0].count;

//     // Get total searches (from books table, assuming each entry represents a search)
//     const searchesResult = await db.execute({
//       sql: "SELECT COUNT(*) as count FROM books",
//       args: [],
//     });
//     const totalSearches = searchesResult.rows[0].count;

//     // Get total downloads (this is a simplification - in a real app, you might have a separate downloads table)
//     const downloadsResult = await db.execute({
//       sql: "SELECT COUNT(*) as count FROM books",
//       args: [],
//     });

//     const totalDownloads = downloadsResult.rows[0].count;

//     // Get active users this week
//     const activeUsersResult = await db.execute({
//       sql: `
//         SELECT COUNT(DISTINCT userId) as count
//         FROM sessions
//         WHERE expires > datetime('now', '-7 days')
//       `,
//       args: [],
//     });
//     const activeUsers = activeUsersResult.rows[0].count;

//     return {
//       totalUsers,
//       totalSearches,
//       totalDownloads,
//       activeUsers,
//     };
//   } catch (error) {
//     console.error("Error fetching dashboard stats:", error);
//     // Return default values if there's an error
//     return {
//       totalUsers: 0,
//       totalSearches: 0,
//       totalDownloads: 0,
//       activeUsers: 0,
//     };
//   }
// }

export async function getDashboardStats() {
  try {
    // Get total users
    const usersResult = await db.execute({
      sql: "SELECT COUNT(*) as count FROM users",
      args: [],
    });
    const totalUsers = usersResult.rows[0].count ?? 0; // Default to 0 if null

    // Get total searches
    const searchesResult = await db.execute({
      sql: "SELECT COUNT(*) as count FROM search_history",
      args: [],
    });
    const totalSearches = searchesResult.rows[0].count ?? 0; // Default to 0 if null

    // Get total downloads
    const downloadsResult = await db.execute({
      sql: "SELECT COUNT(*) as count FROM books",
      args: [],
    });
    const totalDownloads = downloadsResult.rows[0].count ?? 0; // Default to 0 if null

    // Get active users this week
    // const activeUsersResult = await db.execute({
    //   sql: `
    //     SELECT COUNT(DISTINCT userId) as count
    //     FROM sessions
    //     WHERE expires > datetime('now', '-7 days')
    //   `,
    //   args: [],
    // });
    // const activeUsers = activeUsersResult.rows[0].count ?? 0; // Default to 0 if null

    return {
      totalUsers: Number(totalUsers), // Ensure it's a number
      totalSearches: Number(totalSearches), // Ensure it's a number
      totalDownloads: Number(totalDownloads), // Ensure it's a number
      // activeUsers: Number(activeUsers), // Ensure it's a number
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalUsers: 0,
      totalSearches: 0,
      totalDownloads: 0,
      // activeUsers: 0,
    };
  }
}

export async function getTopSearchedBooks(limit = 10) {
  try {
    // This is a simplified query - in a real app, you would have a proper search_history table
    const result = await db.execute({
      sql: `
        SELECT title, COUNT(*) as searchCount
        FROM books
        GROUP BY title
        ORDER BY searchCount DESC
        LIMIT ?
      `,
      args: [limit],
    });

    return result.rows;
  } catch (error) {
    console.error("Error fetching top searched books:", error);
    return [];
  }
}

export async function getTopDownloadedBooks(limit = 10) {
  try {
    // This is a simplified query - in a real app, you would have a proper downloads table
    const result = await db.execute({
      sql: `
        SELECT title, COUNT(*) as downloadCount
        FROM books
        GROUP BY title
        ORDER BY downloadCount DESC
        LIMIT ?
      `,
      args: [limit],
    });

    return result.rows;
  } catch (error) {
    console.error("Error fetching top downloaded books:", error);
    return [];
  }
}

export async function getAllUsers() {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM users ORDER BY created_at DESC",
      args: [],
    });

    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

interface UserUpdateData {
  name: string;
  email: string;
}

export async function updateUser(userId: string, userData: UserUpdateData) {
  try {
    await db.execute({
      sql: "UPDATE users SET name = ?, email = ? WHERE id = ?",
      args: [userData.name, userData.email, userId],
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error };
  }
}

export async function deleteUser(userId: string) {
  try {
    await db.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [userId],
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error };
  }
}

export async function resetUserPassword(userId: string, newPassword: string) {
  try {
    // In a real app, you would hash the password before storing it
    await db.execute({
      sql: "UPDATE user_credentials SET password = ? WHERE userId = ?",
      args: [newPassword, userId],
    });
    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, error };
  }
}
