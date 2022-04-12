import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

interface NavigateProps {
  name: never | string;
  params?: never | any;
  reset?: boolean;
}

export function navigate({ name, params, reset = false }: NavigateProps) {
  if (!navigationRef?.isReady()) {
    return;
  }

  if (reset) {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: name }],
    });
    navigationRef.dispatch(resetAction);
  }

  /* @ts-ignore */
  navigationRef.navigate(name, params);
}
