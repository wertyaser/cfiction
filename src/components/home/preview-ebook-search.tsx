import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function PreviewEbookSearch() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center sm:text-left">
        Ctrl+Fiction: Multi-Source EBook Search
      </h1>
      <div className="space-y-4 mb-8">
        <div className="bg-accent border-l-4 border-foreground p-4 mb-4 rounded-md">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-foreground mr-2" />
            <p className="text-sm text-foreground font-medium">AI Search Suggestions</p>
          </div>
          <p className="text-sm text-foreground mt-1">
            Type a search term and click the sparkle icon (<Sparkles className="h-3 w-3 inline" />)
            to get AI-powered book suggestions. Use arrow keys to navigate and Enter to select a
            suggestion.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          <div className="flex items-center space-x-2">
            <Checkbox id="gutenberg" />
            <Badge variant={"default"}>
              <Label htmlFor="gutenberg">Project Gutenberg</Label>
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="openlibrary" />
            <Badge variant={"outline"}>
              <Label htmlFor="openlibrary">Open Library</Label>
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="archive" />
            <Badge variant={"destructive"}>
              <Label htmlFor="archive">Internet Archive</Label>
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search for ebooks..." className="pl-8" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 text-foreground hover:text-primary"
              title="Get AI suggestions">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full sm:w-auto">Search</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex h-full">
              <div className="w-1/3 p-3">
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="w-2/3 p-4 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
