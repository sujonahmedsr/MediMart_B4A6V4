import Manageusers from "@/components/modules/Admin/user/Manageusers";
import { allUsers } from "@/services/Admin";

const page = async () => {
    const data = await allUsers();
    return (
        <div>
            <Manageusers users={data?.data} />
        </div>
    );
};

export default page;
