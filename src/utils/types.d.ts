interface StandardAction {
  type: string;
  payload?: any;
}

// interface SignUpData {
//   name: string;
//   user_type: 'athlete' | 'monitor' | 'advisor';
//   password: string;
//   email: string;
//   phone: string;
//   birthdate: string;
//   athlete_image: string;
//   gender: 'male' | 'female';
//   group_id: string;
//   group_name: string;
//   athletes_quantity: number;
//   group_image: string;
// }

interface SignUpData
  extends SelectPersonalInfoReturnData,
    SelectGenderAndBirthdateReturnData,
    SelectPasswordReturnData,
    RegisterGroupReturnData {
  user_type: 'athlete' | 'monitor' | 'advisor';
  group_id?: string;
}

interface SelectPersonalInfoReturnData {
  name: string;
  email: string;
  athlete_image: FormData;
  phone: string;
}

interface SelectGenderAndBirthdateReturnData {
  gender: 'male' | 'female';
  birthdate: string;
}

interface SelectPasswordReturnData {
  password: string;
  confirmedPassword?: string;
}

interface RegisterGroupReturnData {
  group_name: string;
  athletes_quantity: number;
  group_image: string;
}

interface Gender {
  type: 'male' | 'female';
  name: 'Masculino' | 'Feminino';
}
