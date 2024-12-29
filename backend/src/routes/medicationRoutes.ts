import { Router } from 'express';
import { MedicationController } from '../controllers/medicationController';

const router = Router();
const medicationController = new MedicationController();

router.get('/reminders', medicationController.getReminders.bind(medicationController));
router.post('/reminders/:reminderId/check-in', medicationController.checkInReminder.bind(medicationController));

export default router;