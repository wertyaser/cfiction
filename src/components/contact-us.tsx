import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
              <Label>First Name</Label>
              <Input type="text" placeholder="ex. John" />
              <Label>First Name</Label>
              <Input type="text" placeholder="ex. John" />
            </div>
            <div className="">
              <Label>Last Name</Label>
              <Input type="text" placeholder="" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
