// USER INTERFACE
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

export { User, Organizer };
