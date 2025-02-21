import { deleteAdmin } from "@/app/lib/actions";
import { fetchAdmins} from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const AdminsPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, admins } = await fetchAdmins(q, page);

  
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for an admin..." />
          <Link href="/dashboard/admin/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={admin.img || "/noavatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {admin.username}
                  </div>
                </td>
                <td>{admin.email}</td>
                <td>{admin.createdAt?.toString().slice(4, 16)}</td>
                <td>{admin.isAdmin ? "Admin" : "Client"}</td>
                <td>{admin.isActive ? "active" : "passive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/admin/${admin.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteAdmin}>
                      <input type="hidden" name="id" value={(admin.id)} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
    );
  };
  
  export default AdminsPage;
  