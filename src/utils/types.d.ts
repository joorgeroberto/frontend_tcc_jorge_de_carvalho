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

interface SelectGenderAndBirthdateReturnData {
  gender: 'male' | 'female' | 'other';
  birthdate: string;
}

interface SelectPasswordReturnData {
  password: string;
  confirmedPassword: string;
}

interface RegisterGroupReturnData {
  groupName: string;
  athletesQuantity: number;
  groupImage: string;
}

interface Gender {
  type: 'male' | 'female' | 'other';
  name: 'Masculino' | 'Feminino' | 'Outro';
}
