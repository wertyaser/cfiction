// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Settings } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { useActionState } from "react";
// import { updateUser } from "@/actions/validation";

// interface RegisterState {
//   success?: boolean;
//   message?: string;
//   errors?: {
//     form?: string[];
//     email?: string[];
//   };
// }

// export function EditUser({ currentEmail }: { currentEmail: string }) {
//   const { data: session } = useSession();
//   const userId = session?.user?.id;
//   const userName = session?.user?.name || "";

//   const initialState: RegisterState = { errors: {} };
//   const [state, formAction, isPending] = useActionState(
//     async (_: RegisterState, formData: FormData) => {
//       if (!userId) {
//         return { success: false, message: "User not authenticated" };
//       }

//       const updatedData = {
//         ...(formData.get("name") && { firstName: formData.get("name") as string }),
//         ...(formData.get("email") && { email: formData.get("email") as string }),
//       };

//       if (Object.keys(updatedData).length === 0) {
//         return { success: false, message: "No fields to update" };
//       }

//       return await updateUser(userId, updatedData);
//     },
//     initialState
//   );

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <button className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent">
//           <Settings className="h-4 w-4" />
//           Account Information
//         </button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Edit Information</AlertDialogTitle>
//           <AlertDialogDescription>
//             <form action={formAction} className="w-full space-y-4">
//               <input type="hidden" name="userId" value={userId} />

//               <div>
//                 <Label htmlFor="name">Name</Label>
//                 <Input id="name" name="name" type="text" defaultValue={userName} />
//               </div>

//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" name="email" type="email" defaultValue={currentEmail} />
//                 {state.errors?.email && (
//                   <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
//                 )}
//               </div>

//               {state.success === false && state.message && (
//                 <div className="text-red-500 text-sm">{state.message}</div>
//               )}
//               {state.success && (
//                 <div className="text-green-500 text-sm">Profile updated successfully!</div>
//               )}

//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction
//                   type="submit"
//                   disabled={isPending || !userId}
//                   className={isPending ? "opacity-50 cursor-not-allowed" : ""}>
//                   {isPending ? "Saving..." : "Save Changes"}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </form>
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
