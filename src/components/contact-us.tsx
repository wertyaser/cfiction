import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ContactUs() {
  return (
    <div id="contact-us" className=" max-w-4xl mx-auto mt-20">
      <h2 className="text-5xl font-bold text-center">
        <span className="font-semibold">Contact Us</span>
      </h2>
      <div className="flex justify-center items-center">
        <span className="text-xl font-thin leading-relaxed text-center max-w-3xl">
          Got a technical issue? Want to send feedback about a beta feature?
          <br />
          Need details about our Business plan? Let us know.
        </span>
      </div>
      <Card className="max-w-4xl mx-auto mt-5 p-5">
        <CardContent>
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <Label>Name</Label>
              <Input type="text" placeholder="ex. John Doe" />
            </div>
            <div className="">
              <Label>Email</Label>
              <Input type="email" placeholder="ex. 2021-******@rtu.edu.ph" />
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-2">
            <Label>Your message</Label>
            <Textarea placeholder="Type your message here..." />
            <Button className="">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
