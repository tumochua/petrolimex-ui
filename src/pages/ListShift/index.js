import Header from "@/layouts/Header";
import { apiListShift } from "@/services/apis";
import { useEffect, useState, useMemo } from "react";
import styles from './ListShift.module.scss'; // Import SCSS module

function ListShift() {
    const [shiftData, setShiftData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); // State cho sắp xếp

    useEffect(() => {
        (async () => {
            const res = await apiListShift();
            setShiftData(res.data?.data); // Giả sử response là mảng shift
        })();
    }, []);

    const filteredShifts = useMemo(() => {
        return shiftData.filter((shift) => {
            const shiftText = shift?.shift?.toLowerCase() || '';
            const firstName = shift?.shiftData?.firstName?.toLowerCase() || '';
            const lastName = shift?.shiftData?.lastName?.toLowerCase() || '';
            const email = shift?.shiftData?.email?.toLowerCase() || '';
            const query = searchQuery.toLowerCase();

            return (
                shiftText.includes(query) ||
                firstName.includes(query) ||
                lastName.includes(query) ||
                email.includes(query)
            );
        });
    }, [shiftData, searchQuery]);

    // Hàm sắp xếp dữ liệu
    const sortedShifts = useMemo(() => {
        return [...filteredShifts].sort((a, b) => {
            if (sortConfig.key) {
                const aValue = a[sortConfig.key] ?? a.shiftData[sortConfig.key];
                const bValue = b[sortConfig.key] ?? b.shiftData[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
            return 0;
        });
    }, [filteredShifts, sortConfig]); // Chỉ sắp xếp lại khi filteredShifts hoặc sortConfig thay đổi

    // Hàm thay đổi thứ tự sắp xếp
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    console.log(shiftData);


    return (
        <>
            <Header />
            <div className={styles["shift-container"]}>
                <h1>Danh sách ca làm</h1>
                {/* Thanh tìm kiếm */}
                <div className={styles["search-bar"]}>
                    <input
                        type="text"
                        className={styles["search-input"]}
                        placeholder="Tìm kiếm ca làm việc, tên người dùng, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
                    />
                </div>

                {/* Bảng dữ liệu */}
                <table className={styles["table"]}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("shift")}>
                                Ca làm việc&nbsp;
                                <span className={styles.sortIcon}>
                                    <span className={sortConfig.key === "shift" && sortConfig.direction === "asc" ? styles.active : ""}>↑</span>
                                    <span className={sortConfig.key === "shift" && sortConfig.direction === "desc" ? styles.active : ""}>↓</span>
                                </span>
                            </th>
                            <th onClick={() => handleSort("time")}>
                                Thời gian&nbsp;
                                <span className={styles.sortIcon}>
                                    <span className={sortConfig.key === "time" && sortConfig.direction === "asc" ? styles.active : ""}>↑</span>
                                    <span className={sortConfig.key === "time" && sortConfig.direction === "desc" ? styles.active : ""}>↓</span>
                                </span>
                            </th>
                            <th onClick={() => handleSort("firstName")}>
                                Tên người dùng&nbsp;
                                <span className={styles.sortIcon}>
                                    <span className={sortConfig.key === "firstName" && sortConfig.direction === "asc" ? styles.active : ""}>↑</span>
                                    <span className={sortConfig.key === "firstName" && sortConfig.direction === "desc" ? styles.active : ""}>↓</span>
                                </span>
                            </th>
                            <th onClick={() => handleSort("email")}>
                                Email&nbsp;
                                <span className={styles.sortIcon}>
                                    <span className={sortConfig.key === "email" && sortConfig.direction === "asc" ? styles.active : ""}>↑</span>
                                    <span className={sortConfig.key === "email" && sortConfig.direction === "desc" ? styles.active : ""}>↓</span>
                                </span>
                            </th>
                        </tr>
                    </thead>



                    <tbody>
                        {sortedShifts.length > 0 ? (
                            sortedShifts
                                .filter(
                                    (shift) =>
                                        shift?.shiftData?.firstName !== null ||
                                        shift?.shiftData?.lastName !== null ||
                                        shift?.shiftData?.email !== null
                                )
                                .map((shift) => (
                                    <tr key={shift.id}>
                                        <td>{shift?.shift}</td>
                                        <td>{shift?.time}</td>
                                        <td>
                                            {shift?.shiftData?.firstName} {shift?.shiftData?.lastName}
                                        </td>
                                        <td>{shift?.shiftData?.email}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                    Không tìm thấy kết quả nào.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default ListShift;
