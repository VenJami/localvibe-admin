import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import { fetchReport } from "@/app/lib/data";
import { deleteReport } from "@/app/lib/actions";


const SingleProductPage = async ({ params }) => {

     const { id } = params;
    const report = await fetchReport(id)
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form action={deleteReport} className={styles.form}>
                <input type="hidden" name="id" value={report.id} />
                <input type="hidden" name="reportedItemId" value={report.reportedItemId} />
                    <label>User ID</label>
                    <input type="text" name="reportUserId" placeholder={report.userId}/>
                    <label>reportedItemId</label>
                    <input type="number" name="reportReportedPostId" placeholder={report.reportedItemId}/>
                    <label>Report count</label>
                    <input type="number" name="reportReportCount" placeholder={report.reportCount}/>
                    <label>Reason</label>
                    <input type="text" name="reportReason" placeholder={report.reason}/>
                    <label>Type</label>
                    <input type="text" name="reportType" placeholder={report.itemType}/>
                    <label>Report Date</label>
                    <textarea type="text" name="reportDate" placeholder={report.reportDate?.toString().slice(4, 16)}/>
                    <label>Content</label>
                    <input name="desc" id="desc" rows="10" placeholder={report.reportTitle}/>

                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage