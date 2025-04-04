"use server";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
// interface UserUpdateData {
//   name: string;
//   email: string;
// }

interface Activity {
  id: string;
  userName: string;
  type: "search" | "download";
  bookTitle: string | null;
  query: string | null;
  timestamp: string;
}

interface PopularBook {
  id: string;
  title: string;
  author: string;
  downloads: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string; // Renamed from created_at for consistency with your mock data
  adminStatus: "admin" | "user"; // Derived or adjust based on your schema
}

// USER CRUD OPERATIONS
export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await db.execute({
      sql: `
        SELECT 
          id,
          name,
          email,
          created_at AS registeredAt,
          isAdmin
        FROM users
        ORDER BY created_at DESC
      `,
      args: [],
    });

    return result.rows.map((row) => ({
      id: String(row.id),
      name: row.name as string,
      email: row.email as string,
      registeredAt: row.registeredAt as string,
      adminStatus: row.isAdmin ? "admin" : "user",
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function editUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const adminStatus = formData.get("adminStatus") as "admin" | "user";
  const isAdmin = adminStatus === "admin" ? 1 : 0;

  console.log("Editing user:", { id, name, email, isAdmin });

  try {
    await db.execute({
      sql: "UPDATE users SET name = ?, email = ?, isAdmin = ? WHERE id = ?",
      args: [name, email, isAdmin, id],
    });
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function resetPassword(formData: FormData) {
  const id = formData.get("id") as string;
  const newPassword = formData.get("new-password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  // Add password hashing (e.g., with bcrypt) here
  // const hashedPassword = newPassword;
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password with bcrypt

  // console.log("Resetting password for user:", { id, hashedPassword });
  try {
    const result = await db.execute({
      sql: "UPDATE users SET password = ? WHERE id = ?",
      args: [hashedPassword, id],
    });
    console.log("Password reset successfully", result);
    revalidatePath("/admin/users"); // Revalidate the path to refresh the data
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

export async function deleteUser(formData: FormData) {
  const id = formData.get("id") as string;

  console.log("Deleting user:", { id });

  try {
    await db.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [id],
    });
    // console.log("Delete result:", id);
    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// export async function deleteUser(formData: FormData) {
//   const id = formData.get("id") as string;

//   console.log("Deleting user:", { id });

//   try {
//     const result = await db.execute({
//       sql: "DELETE FROM users WHERE id = ?",
//       args: [id],
//     });
//     console.log("Delete result:", result);
//     revalidatePath("/admin/users"); // Adjust to your route
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw error;
//   }
// }

export async function getPopularBooks() {
  try {
    const result = await db.execute({
      sql: `
        SELECT 
          MIN(id) AS id,  -- Use MIN(id) to get a single id per title
          title,
          author,
          COUNT(*) AS downloads
        FROM books
        GROUP BY title
        ORDER BY downloads DESC
        LIMIT 5  -- Top 5 most popular books
      `,
      args: [],
    });

    const books: PopularBook[] = result.rows.map((row) => ({
      id: String(row.id), // Ensure id is a string
      title: row.title as string,
      author: row.author as string,
      downloads: Number(row.downloads), // Ensure downloads is a number
    }));

    return books;
  } catch (error) {
    console.error("Error fetching popular books:", error);
    return [];
  }
}

export async function getRecentActivities(): Promise<Activity[]> {
  try {
    const currentDate = new Date();

    const result = await db.execute({
      sql: `
        SELECT 
          sh.id,
          u.name AS userName,
          'search' AS type,
          NULL AS bookTitle,
          sh.query,
          sh.created_at AS timestamp
        FROM search_history sh
        JOIN users u ON sh.userId = u.id
        WHERE sh.created_at >= datetime(?, '-7 days')

        UNION ALL

        SELECT 
          b.id,
          u.name AS userName,
          'download' AS type,
          b.title AS bookTitle,
          NULL AS query,
          b.created_at AS timestamp
        FROM books b
        JOIN users u ON b.userId = u.id  -- Changed from b.user to b.userId
        WHERE b.created_at >= datetime(?, '-7 days')
        ORDER BY timestamp DESC
        LIMIT 10
    `,
      args: [currentDate.toISOString(), currentDate.toISOString()],
    });

    const activities: Activity[] = result.rows.map((row) => ({
      id: String(row.id), // Ensure id is a string
      userName: row.userName as string,
      type: row.type as "search" | "download",
      bookTitle: (row.bookTitle as string) || null, // Null if no bookTitle (for searches)
      query: (row.query as string) || null, // Null if no query (for downloads)
      timestamp: row.timestamp as string, // Assuming stored as ISO string
    }));

    return activities;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
}

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

// USER CRUD OPERATIONS (commented out for now, but you can uncomment and use them as needed)
// export async function updateUser(userId: string, userData: UserUpdateData) {
//   try {
//     await db.execute({
//       sql: "UPDATE users SET name = ?, email = ? WHERE id = ?",
//       args: [userData.name, userData.email, userId],
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return { success: false, error };
//   }
// }

// export async function deleteUser(userId: string) {
//   try {
//     await db.execute({
//       sql: "DELETE FROM users WHERE id = ?",
//       args: [userId],
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return { success: false, error };
//   }
// }

// export async function resetUserPassword(userId: string, newPassword: string) {
//   try {
//     // In a real app, you would hash the password before storing it
//     await db.execute({
//       sql: "UPDATE user_credentials SET password = ? WHERE userId = ?",
//       args: [newPassword, userId],
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return { success: false, error };
//   }
// }
