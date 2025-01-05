const Attendance = require('../models/Attendance');

const getAttendances = async (req, res, next) => {
    try {
        const attendances = await Attendance.getAllAtendances();
        res.json(attendances);
    } catch (error) {
        next(error);
    }
};

const createAttendance = async (req, res, next) => {
    try {
        const newAttendance = await Attendance.createAttendance(req.body);
        res.status(201).json({ id: newAttendance.insertId });
    } catch (error) {
        next(error);
    }
};

const updateAttendance = async (req, res, next) => {
    try {
        const updatedAttendance = await Attendance.updateAttendance(
            req.params.id,
            req.body
        );
        res.json(updatedAttendance);
    } catch (error) {
        next(error);
    }
};

const deleteAttendance = async (req, res, next) => {
    try {
        await Attendance.deleteAttendance(req.params.id);
        res.json({ message: 'Attendance deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const getAllAttendancesByEmployeeId = async (req, res, next) => {
    try {
        const attendancesForSpecificEmployee = await Attendance.getAllAttendancesByEmployeeId(req.params.id);
        res.json(attendancesForSpecificEmployee);
    } catch (error) {
        next(error);
    }
};

const getAllEmployeesOnDuty = async (req, res, next) => {
    try {
        const employeesOnDuty = await Attendance.getAllEmployeesOnDuty();
        res.json(employeesOnDuty);
    } catch (error) {
        next(error);
    }
};

const getAllEmployeesOnDutyForSpecificWarehouse = async (req, res, next) => {
    try {
        const employeesOnDutyForSpecificWarehouse = await Attendance.getAllEmployeesOnDutyForSpecificWarehouse(req.params.id);
        res.json(employeesOnDutyForSpecificWarehouse);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAttendances,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendancesByEmployeeId,
    getAllEmployeesOnDuty,
    getAllEmployeesOnDutyForSpecificWarehouse,
};
