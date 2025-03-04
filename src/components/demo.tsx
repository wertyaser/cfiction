// import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Input } from "./ui/input";

export default function Demo() {
  // const [inputValue, setInputValue] = useState("");

  return (
    <section id="demo" className="min-h-screen max-w-4xl mx-auto">
      <h2 className="text-7xl font-bold">
        <span>D</span>
        <span className="font-thin">emo</span>
      </h2>
      <div className="flex justify-center items-center mt-5">
        <Card className="w-full">
          <CardContent className="p-10">
            <div className="bg-gray-800 text-white text-sm p-2 rounded w-fit chat chat-start">
              <div className="chat-bubble">
                <p>/Atomic Habits</p>
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-fit chat chat-end">
              <span className="chat-bubble mr-2">AtomicHabits.pdf</span>
              <Download className="h-4 w-4 cursor-pointer" />
            </div>

            <div className="flex mt-4">
              <Input
                type="text"
                className="flex-grow rounded-r-none"
                // value={inputValue}
                // onChange={(e) => setInputValue(e.target.value)}
              />
              <Button className="bg-gray-700 rounded-l-none">Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
