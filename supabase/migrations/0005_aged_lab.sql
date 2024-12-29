/*
  # Add medication reminders system

  1. New Tables
    - `medication_reminders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `plan_medication_id` (uuid, references plan_medications)
      - `reminder_time` (time)
      - `days_of_week` (integer[])
      - `is_enabled` (boolean)
      - `notification_type` (text)
      - Timestamps (created_at, updated_at)

    - `reminder_logs`
      - `id` (uuid, primary key)
      - `reminder_id` (uuid, references medication_reminders)
      - `scheduled_at` (timestamptz)
      - `status` (text)
      - `response_at` (timestamptz)
      - Timestamps (created_at, updated_at)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own reminders
    - Add policies for authenticated users to view their reminder logs

  3. Changes
    - Add indexes for better query performance
    - Add constraints for data validation
*/

-- Create medication_reminders table
CREATE TABLE IF NOT EXISTS medication_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_medication_id uuid REFERENCES plan_medications(id) ON DELETE CASCADE,
  reminder_time time NOT NULL,
  days_of_week integer[] NOT NULL,
  is_enabled boolean DEFAULT true,
  notification_type text NOT NULL CHECK (notification_type IN ('app', 'email', 'both')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_days_of_week_length CHECK (array_length(days_of_week, 1) BETWEEN 1 AND 7),
  CONSTRAINT valid_days_of_week_range CHECK (array_position(days_of_week, -1) IS NULL AND array_position(days_of_week, 7) IS NULL)
);

-- Create reminder_logs table
CREATE TABLE IF NOT EXISTS reminder_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reminder_id uuid REFERENCES medication_reminders(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'sent', 'acknowledged', 'missed')),
  response_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for medication_reminders
CREATE POLICY "Users can view their own reminders"
  ON medication_reminders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own reminders"
  ON medication_reminders
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for reminder_logs
CREATE POLICY "Users can view their own reminder logs"
  ON reminder_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_reminders mr 
    WHERE mr.id = reminder_id AND mr.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their own reminder logs"
  ON reminder_logs
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_reminders mr 
    WHERE mr.id = reminder_id AND mr.user_id = auth.uid()
  ));

-- Create indexes
CREATE INDEX idx_medication_reminders_user ON medication_reminders(user_id);
CREATE INDEX idx_medication_reminders_plan ON medication_reminders(plan_medication_id);
CREATE INDEX idx_reminder_logs_reminder ON reminder_logs(reminder_id);
CREATE INDEX idx_reminder_logs_scheduled ON reminder_logs(scheduled_at);

-- Create updated_at triggers
CREATE TRIGGER update_medication_reminders_updated_at
  BEFORE UPDATE ON medication_reminders
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reminder_logs_updated_at
  BEFORE UPDATE ON reminder_logs
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();