"use client"; // ✅ Add this to ensure it runs on the client side

import { useEffect, useState } from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const res = await fetch("/api/accounts");
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                setTotalUsers(data.totalAccounts);
            } catch (error) {
                console.error("Error fetching total users:", error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Total Users</span>
                <span className={styles.number}>{totalUsers}</span> {/* ✅ Display actual count */}
                <span className={styles.detail}>
                    <span className={styles.positive}>12%</span> more than last week
                </span>
            </div>
        </div>
    );
};

export default Card;