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

interface SelectGenderAndBirthdayReturnData {
  gender: 'male' | 'female' | 'other';
  birthday: string;
}

interface Gender {
  type: 'male' | 'female' | 'other';
  name: 'Masculino' | 'Feminino' | 'Outro';
}
