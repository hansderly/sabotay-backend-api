// USER INTERFACE
import { Cycle } from '@prisma/client';

interface User {
  first_name: string;
  last_name: string;
  phone: string;
}

interface Organizer extends User {
  username: string;
  email: string;
  password: string;
}

interface Group {
  name: string;
  contribution_amount: number;
  cycle: Cycle;
  cycle_duration: number;
  start_date: string;
  end_date: string;
  user_id: string;
}

export { User, Organizer, Group };
