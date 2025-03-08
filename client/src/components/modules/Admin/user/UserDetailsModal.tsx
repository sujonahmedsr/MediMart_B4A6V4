import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IUser } from "@/types/user";
import { Eye } from "lucide-react";

const UserDetailsModal = ({ user }: { user: IUser }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant={"outline"} className="text-gray-500 hover:text-blue-500 rounded"
            title="View"><Eye className="w-5 h-5" /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p><strong>Name:</strong> {user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
          <p><strong>Role:</strong> {user?.role || "N/A"}</p>
          <p><strong>City:</strong> {user?.city || "N/A"}</p>
          <p><strong>Address:</strong> {user?.address || "N/A"}</p>
          <p><strong>Blocked Status:</strong> {user?.isBlocked ? "Blocked" : "Active"}</p>
          {/* <p><strong>Created At:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user?.updatedAt).toLocaleString()}</p> */}
          <p><strong>User ID:</strong> {user?._id}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
