import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Label, Notification, Textarea } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import type { Lab } from "@/types";

interface ContactLabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lab: Lab;
}

const ContactLabDialog = ({
  open,
  onOpenChange,
  lab,
}: ContactLabDialogProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !message) {
      Notification({
        toastMessage: "Please fill in all fields",
        toastStatus: "error",
      });
      return;
    }

    // In a real app, this would send a message to the lab
    Notification({
      toastMessage: `Message sent to ${lab.name}`,
      toastStatus: "success",
    });

    // Reset form
    setSubject("");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact {lab.name}</DialogTitle>
          <DialogDescription>
            Send a message to your lab partner
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 p-3 rounded-lg text-sm mb-4">
          <p className="text-gray-900">{lab.name}</p>
          <p className="text-gray-600">{lab.address}</p>
          <p className="text-gray-600">{lab.phone}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order-status">
                  Order Status Inquiry
                </SelectItem>
                <SelectItem value="test-availability">
                  Test Availability
                </SelectItem>
                <SelectItem value="results-delay">Results Delay</SelectItem>
                <SelectItem value="technical-issue">Technical Issue</SelectItem>
                <SelectItem value="billing">Billing Question</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactLabDialog;
