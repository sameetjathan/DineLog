import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface OrderModalProps {
  trigger?: React.ReactNode;
  onSubmit?: (orderData: any) => void;
}

export const OrderModal = ({ trigger, onSubmit }: OrderModalProps) => {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    table: "",
    items: "",
    priority: "normal",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData.table || !orderData.items) {
      toast.error("Please fill in all required fields");
      return;
    }

    const order = {
      ...orderData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    if (onSubmit) {
      onSubmit(order);
    }

    toast.success("Order placed successfully!");
    setOpen(false);
    setOrderData({ table: "", items: "", priority: "normal", notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>New Order</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Enter order details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="table">Table Number *</Label>
              <Input
                id="table"
                placeholder="e.g., T1, T2, T3"
                value={orderData.table}
                onChange={(e) => setOrderData({ ...orderData, table: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="items">Items *</Label>
              <Textarea
                id="items"
                placeholder="e.g., 2x Burger, 1x Pizza"
                value={orderData.items}
                onChange={(e) => setOrderData({ ...orderData, items: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={orderData.priority}
                onValueChange={(value) => setOrderData({ ...orderData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions..."
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Place Order</Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
