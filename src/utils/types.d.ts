interface StandardAction {
  type: string;
  payload?: any;
}

interface SelectPersonalInfoReturnData {
  name: string;
  email: string;
  image: string;
  phone: string;
}
