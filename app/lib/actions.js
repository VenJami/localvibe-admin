import { revalidatePath } from "next/cache";
import { User } from "./models";
import { Report } from "./models";
import { Admin } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/dist/server/api-utils";
import { permanentRedirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Post } from "./models";

export const addUser = async (formData)=>{
    "use server"
    const {userName, email, password, name, accountType} =
    Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            userName,
            name, 
            email, 
            password:hashedPassword,  
            accountType, 
        });

        
    await newUser.save(); 
    }catch(err){
        console.log(err)
        throw new Error("failed to create user!");
    }

    revalidatePath("/dashboard/users")
    permanentRedirect("/dashboard/users")
}

export const deleteUser = async (formData)=>{
    "use server"
    const { id } =
    Object.fromEntries(formData);

    try {
    connectToDB();
    await User.findByIdAndDelete(id); 
    }catch(err){
        console.log(err)
        throw new Error("failed to delete user!");
    }

    revalidatePath("/dashboard/users")
    
}

export const updateUser = async (formData) => {
    "use server"
    const {id, userName, email, password, name, accountType} = 
    Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            userName,
            email,
            password,
            name,
            accountType,
        }
        Object.keys(updateFields).forEach(
            (key)=>
                (updateFields[key]==="" || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(id, updateFields);

    }catch(err){
        console.log(err)
        throw new Error("failed to update user!");
    }

    revalidatePath("/dashboard/users")
    permanentRedirect("/dashboard/users")

}

export const addAdmin = async (formData) => {
    "use server"
    const {id, username, email, password, isAdmin, isActive, phone, address} =
    Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            isAdmin,
            isActive,
            phone,
            address,
        });

    await newAdmin.save(); 
    } catch (err) {
        console.log(err)
        throw new Error("failed to create admin!");
    }

    revalidatePath("/dashboard/admin")
    permanentRedirect("/dashboard/admin")
}

export const deleteAdmin = async (formData)=>{
    "use server"
    const { id } =
    Object.fromEntries(formData);

    try {
    connectToDB();
    await Admin.findByIdAndDelete(id); 
    }catch(err){
        console.log(err)
        throw new Error("failed to delete Admin!");

    }

    revalidatePath("/dashboard/admin")
    
}

export const updateAdmin = async (formData) => {
    "use server"
    const {id, username, email, password, isAdmin, isActive, phone, address} = 
    Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            username,
            email,
            password,
            isAdmin,
            isActive,
            phone,
            address,
        }
        Object.keys(updateFields).forEach(
            (key)=>
                (updateFields[key]==="" || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(id, updateFields);

    }catch(err){
        console.log(err)
        throw new Error("failed to update user!");
    }

    revalidatePath("/dashboard/admin")
    permanentRedirect("/dashboard/admin")

}

export const deleteReport = async (formData) => {
    "use server";
    const { id, reportedItemId } = Object.fromEntries(formData);
    console.log(`Attempting to delete report with ID: ${id} and reportedItemId: ${reportedItemId}`);

    try {
        connectToDB();
        console.log("Database connection established.");

        // Delete the post if the reportedItemId matches
        const post = await Post.findById(reportedItemId);
        if (post) {
            console.log(`Post found with id: ${reportedItemId}. Deleting post.`);
            await Post.findByIdAndDelete(reportedItemId);
            console.log(`Post with id: ${reportedItemId} deleted successfully.`);
        } else {
            console.log(`No post found with id: ${reportedItemId}.`);
        }

        // Delete the report
        const result = await Report.findByIdAndDelete(id);
        if (result) {
            console.log(`Report with ID: ${id} deleted successfully.`);
        } else {
            console.log(`No report found with ID: ${id}.`);
        }

    } catch (err) {
        console.log("Error occurred during deletion:", err);
        throw new Error("Failed to delete report!");
    }

    revalidatePath("/dashboard/products");
    permanentRedirect("/dashboard/products");
};
