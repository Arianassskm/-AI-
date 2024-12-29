import { Request, Response } from 'express';
import { MedicationService } from '../services/medicationService';

export class MedicationController {
  private medicationService: MedicationService;

  constructor() {
    this.medicationService = new MedicationService();
  }

  async getReminders(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const reminders = await this.medicationService.getReminders(userId);
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get reminders' });
    }
  }

  async checkInReminder(req: Request, res: Response) {
    try {
      const { reminderId } = req.params;
      const userId = req.user?.id;
      const checkIn = await this.medicationService.checkInReminder(userId, reminderId);
      res.json(checkIn);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check in reminder' });
    }
  }
}