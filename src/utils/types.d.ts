interface StandardAction {
  type: string;
  payload?: any;
}

interface ImageData {
  multipartFormName: string;
  fileName: string;
  type: string;
  uri: string;
}

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
  athlete_image: ImageData | string;
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

interface SelectGroupReturnData {
  group_id: string;
  group_name: string;
}

interface RegisterGroupReturnData {
  group_name: string;
  athletes_quantity: number;
  group_image: ImageData | string;
}

interface Gender {
  type: 'male' | 'female';
  name: 'Masculino' | 'Feminino';
}
