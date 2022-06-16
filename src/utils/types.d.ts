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

interface AthleteData {
  id: string;
  name: string;
  image?: string;
}

interface RegisterPlanningNameWeekAndDateReturnData {
  name: string;
  numberOfWeeks: number;
  startDate: string;
}

interface ExerciseData {
  type: 'distance' | 'duration';
  duration: float;
  distance: float;
  description: string;
}

interface ExerciseGroupData {
  numberRepetitions: number;
  exercises: Array<ExerciseData>;
}

interface TrainingData {
  date: string;
  type: string;
  exerciseGroups: Array<ExerciseGroupData>;
}

interface PlanningData extends RegisterPlanningNameWeekAndDateReturnData {
  endDate: string;
  athleteId: string;
  trainings: Array<TrainingData>;
}

interface PerformedTraining {
  calories: number;
  duration: string;
  distance: string;
  vMed: number;
  vMax: number;
  fcRest: number;
  fcMed: number;
  fcMax: number;
  trainingId?: string;
}
