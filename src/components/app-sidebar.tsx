"use client";
// import { useState } from "react";
import { Files, Settings, LogOut, Search, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SideHeader from "./sidebar-header";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import ThemeSwitch from "./ui/theme-switch";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DownloadedBook, SearchHistoryItem } from "@/types/next-auth";
import { useState } from "react";
// import { url } from "inspector";

const items = [
  {
    title: "Downloads",
    icon: Files,
    content: "Here you can view and manage your downloads.",
  },
  {
    title: "Search History",
    icon: Search,
    content: "Your recent searches will be displayed here.",
  },
  {
    title: "Account Details",
    icon: Settings,
    content: "Manage your account settings here.",
  },
];

// const downloadedList = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     icon: Files,
//     url: "https://www.gutenberg.org/ebooks/64317",
//   },
//   {
//     id: 2,
//     title: "1984",
//     icon: Files,
//     url: "https://www.gutenberg.org/ebooks/1342",
//   },
//   {
//     id: 3,
//     title: "To Kill a Mockingbird",
//     icon: Files,
//     url: "https://www.gutenberg.org/ebooks/174",
//   },
//   {
//     id: 4,
//     title: "Pride and Prejudice",
//     icon: Files,
//     url: "https://www.gutenberg.org/ebooks/42671",
//   },
// ];

// const searchList = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     icon: Files,
//   },
//   {
//     id: 2,
//     title: "1984",
//     icon: Files,
//   },
//   {
//     id: 3,
//     title: "To Kill a Mockingbird",
//     icon: Files,
//   },
//   {
//     id: 4,
//     title: "Pride and Prejudice",
//     icon: Files,
//   },
// ];

const accountDetails = [
  {
    id: 1,
    img: User,
    name: "Leoniel Nacman",
    email: "2021-102673@rtu.edu.ph",
    password: "",
  },
];
export default function AppSidebar() {
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  // State for downloaded books and search history
  const [downloadedBooks, setDownloadedBooks] = useState<DownloadedBook[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState({
    downloads: false,
    history: false,
  });

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSheetOpen = async (title: string) => {
    setOpenSheet(title);

    // Fetch data when opening specific sheets
    if (title === "Downloads") {
      await fetchDownloadedBooks();
    } else if (title === "Search History") {
      await fetchSearchHistory();
    }
  };

  const handleSheetClose = () => {
    setOpenSheet(null);
  };

  // Fetch downloaded books
  const fetchDownloadedBooks = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, downloads: true }));
      const response = await fetch("/api/books/download");
      if (response.ok) {
        const data = await response.json();
        setDownloadedBooks(data);
      } else {
        console.error("Failed to fetch downloaded books");
      }
    } catch (error) {
      console.error("Error fetching downloaded books:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, downloads: false }));
    }
  };

  // Fetch search history
  const fetchSearchHistory = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, history: true }));
      const response = await fetch("/api/books/history");
      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data);
      } else {
        console.error("Failed to fetch search history");
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, history: false }));
    }
  };

  //FOR ACCOUNT DETAILS
  // const handleSaveChanges = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Validate passwords match
  //   if (password && password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   // Update account info
  //   setAccountInfo({
  //     ...accountInfo,
  //     password: password || accountInfo.password,
  //   });

  //   alert("Changes saved successfully!");
  //   handleSheetClose();
  // };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Sidebar>
      <SideHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex items-center justify-between">
              <ThemeSwitch />
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-3" />
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Sheet
                  key={item.title}
                  open={openSheet === item.title}
                  onOpenChange={(open) => {
                    if (open) {
                      handleSheetOpen(item.title);
                    } else {
                      handleSheetClose();
                    }
                  }}
                >
                  <SheetTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full sm:max-w-md overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>{item.title}</SheetTitle>
                      <SheetDescription>
                        {item.title === "Downloads" && (
                          <>
                            {isLoading.downloads ? (
                              <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              </div>
                            ) : downloadedBooks.length > 0 ? (
                              <ul className="mt-4 space-y-2">
                                {downloadedBooks.map((book) => (
                                  <a
                                    key={book.bookid}
                                    href={book.downloadurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-accent/50 transition"
                                  >
                                    <Files className="w-5 h-5 text-primary" />
                                    <span>{book.title}</span>
                                  </a>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No downloaded books yet.
                              </div>
                            )}
                          </>
                        )}

                        {item.title === "Search History" && (
                          <>
                            {isLoading.history ? (
                              <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              </div>
                            ) : searchHistory.length > 0 ? (
                              <ul className="mt-4 space-y-2">
                                {searchHistory.map((item, index) => (
                                  <li
                                    key={index}
                                    className="p-2 border rounded-lg"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-muted-foreground" />
                                        <span>{item.title}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(item.created_at)}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No search history yet.
                              </div>
                            )}
                          </>
                        )}
                        {/* TODO: FETCH ACC DETAILS LIKE IN HEADER */}
                        {item.title === "Account Details" && (
                          <ul className="mt-4 space-y-2">
                            {accountDetails.map((index) => (
                              <div
                                key={index.id}
                                className="flex flex-col items-center justify-center gap-2"
                              >
                                <index.img size={100} />
                                <div className="flex flex-col gap-4 w-full">
                                  <div>
                                    <Label>Name</Label>
                                    <Input type="text" value={index.name} />
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <Input type="email" value={index.email} />
                                  </div>
                                  <div>
                                    <Label>Password</Label>
                                    <Input
                                      type="password"
                                      value={index.password}
                                      placeholder="*********"
                                    />
                                  </div>
                                  <div>
                                    <Label>Confirm Password</Label>
                                    <Input
                                      type="password"
                                      placeholder="*********"
                                    />
                                  </div>
                                  <Button type="submit">Save Changes</Button>
                                </div>
                              </div>
                            ))}
                          </ul>
                        )}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4 mb-12">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center gap-2"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  );
}
