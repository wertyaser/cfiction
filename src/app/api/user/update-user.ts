interface UpdateUserResponse {
  success: boolean;
  message?: string;
}

export async function updateUser(
  data: Record<string, string>
): Promise<UpdateUserResponse> {
  try {
    const response = await fetch("/api/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      success: response.ok,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "An error occurred while updating your profile",
    };
  }
}
