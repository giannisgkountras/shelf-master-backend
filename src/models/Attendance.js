const db = require('../config/db');

const Attendance = {
    getAllAtendances: async () => {
        const [rows] = await db.query(
            `SELECT
                Att.timestamp, Att.status, Att.employeeID, e.fullName, e.role
            FROM
                Attendance Att
            JOIN
                Employee e ON e.id = Att.employeeID            
            ORDER BY Att.timestamp DESC`
        );
        return rows;
    },

    createAttendance: async(attendanceData) => {
        const { timestamp, status, employeeName } = attendanceData;

        // Check if the employee really exists
        // If the employee exists, his/her fullName will be unique as delcared in db schema
        const [existingEmployee] = await db.query(
            `SELECT DISTINCT * FROM Employee
            WHERE fullName = ?`, [employeeName]
        );

        if(!existingEmployee.length) {
            // It means that the employee does not exists in any warehouse
            console.log('This is not an employee in any of the warehouses. No insert.');
            return;
        }

        // If the check fails, it means that the employee really exists and his/her id can be retrieved
        const employeeID = existingEmployee[0].id;

        // Insert the attendance
        const [result] = await db.query(
            `INSERT INTO Attendance (status, timestamp, employeeID) VALUES (?, ?, ?)`,
            [status, timestamp, employeeID]
        );

        return { id: result.insertId, status, timestamp, employeeID };
    },

    updateAttendance: async(attendanceId, attendanceData) => {
        const { timestamp, status, employeeName } = attendanceData;

        // Check if the employee really exists
        // If the employee exists, his/her fullName will be unique as delcared in db schema
        const [existingEmployee] = await db.query(
            `SELECT DISTINCT * FROM Employee
            WHERE fullName = ?`, [employeeName]
        );

        if(!existingEmployee.length) {
            // It means that the employee does not exists in any warehouse
            console.log('This is not an employee in any of the warehouses. No update.');
            return;
        }

        // If the check fails, it means that the employee really exists and his/her id can be retrieved
        const employeeID = existingEmployee[0].id;

        // Update the attendance
        await db.query(
            `UPDATE Attendance SET status = ?, timestamp = ?, employeeID = ?
             WHERE id = ?`,
            [status, timestamp, employeeID, attendanceId]
        );

        return { id: attendanceId, status, timestamp, employeeID};
    },

    deleteAttendance: async (attendanceId) => {
        const [result] = await db.query(
            `DELETE FROM Attendance WHERE id = ?`, [
                attendanceId,
        ]);

        return result;
    },

    getAllAttendancesByEmployeeId: async (employeeId) => {
        const [rows] = await db.query(
            `SELECT
                Att.timestamp, Att.status, Att.employeeID, e.fullName, e.role
            FROM
                Attendance Att
            JOIN
                Employee e ON e.id = Att.employeeID
            WHERE e.id = ?
            ORDER BY Att.timestamp DESC`, [
                employeeId,
        ]);

        return rows;
    },

    getAllEmployeesOnDuty: async () => {
        const [rows] = await db.query(
            `SELECT
                Att.timestamp, Att.status,
                Att.employeeID, e.fullName, e.role, e.warehouseID
            FROM
                Attendance Att
            JOIN
                Employee e ON e.id = Att.employeeID
            WHERE
                Att.status = 1
            AND
                Att.timestamp = (SELECT MAX(timestamp) FROM Attendance WHERE employeeID = Att.employeeID)`
        );

        return rows;
    },

    getAllEmployeesOnDutyForSpecificWarehouse: async(warehouseId) => {
        const [rows] = await db.query(
            `SELECT
                Att.timestamp, Att.status, Att.employeeID, e.fullName, e.role, e.warehouseID
            FROM
                Attendance Att
            JOIN
                Employee e ON e.id = Att.employeeID
            WHERE
                Att.status = 1 
            AND
                Att.timestamp = (SELECT MAX(timestamp) FROM Attendance WHERE employeeID = Att.employeeID)
            AND 
            e.warehouseID = ?`, [
                warehouseId,
        ]);

        return rows;
    }
}

module.exports = Attendance;