import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  login: undefined;
  signup: undefined;
};

export type AuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'login'
>;
