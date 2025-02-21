import { updateAdmin } from "@/app/lib/actions";
import { fetchAdmin } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleAdminPage = async ({ params }) => {
  
  const { id } = params;
  const admin = await fetchAdmin(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={admin.img || "/noavatar.png"} alt="" fill />
        </div>
        {admin.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateAdmin} className={styles.form}>
          <input type="hidden" name="id" value={admin.id}/>
          <label>Username</label>
          <input type="text" name="username" placeholder={admin.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={admin.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={admin.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={admin.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={admin.isAdmin}>Yes</option>
            <option value={false} selected={!admin.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={admin.isActive}>Yes</option>
            <option value={false} selected={!admin.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleAdminPage;