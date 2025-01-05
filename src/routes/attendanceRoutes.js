const express = require('express');

const {
    getAttendances,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendancesByEmployeeId,
    getAllEmployeesOnDuty,
    getAllEmployeesOnDutyForSpecificWarehouse,
} = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', getAttendances);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);
router.get('/employees/:id', getAllAttendancesByEmployeeId);
router.get('/employees-on-duty', getAllEmployeesOnDuty);
router.get('/employees-on-duty/warehouses/:id', getAllEmployeesOnDutyForSpecificWarehouse);

module.exports = router;
