import React, { useEffect } from 'react';
import {
  Container,
  GroupsList,
  GroupImage,
  Group,
  Button,
  GroupTextContainer,
  GroupName,
  GroupAdvisor,
  Loader,
} from '../styles/SelectGroup.styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@storeData/index';
import { SignUpActions } from '@storeData/actions/SignUp';
import { API_BASE_URL } from '@config/Api';

interface Props {
  group_id: string;
  group_name: string;
  onPress: (data: SelectGroupReturnData) => void;
}

interface Group {
  id: string;
  name: string;
  advisorName: string;
  image: string;
}

interface RenderGroupProps {
  item: Group;
  selectedGroup: SelectGroupReturnData;
  onChange: (data: SelectGroupReturnData) => void;
}

export function SelectGroup({ group_id, group_name, onPress }: Props) {
  const { groupList, loading } = useSelector(({ signUp }: RootState) => signUp);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    group: yup.object().shape({
      group_id: yup.string().required('Selecione um grupo.'),
      group_name: yup.string().required('Selecione um grupo.'),
    }),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      group: {
        group_id,
        group_name,
      },
    },
  });

  useEffect(() => {
    dispatch(SignUpActions.GetGroupList());
  }, [dispatch]);

  const onSubmit = (info: SelectGroupReturnData) => onPress(info);
  const renderGroup = ({ item, onChange, selectedGroup }: RenderGroupProps) => {
    const isSelected = item.id === selectedGroup?.group_id;

    return (
      <Group
        isSelected={isSelected}
        onPress={() => onChange({ group_id: item.id, group_name: item.name })}>
        <GroupImage source={{ uri: `${API_BASE_URL}/files/${item.image}` }} />
        <GroupTextContainer>
          <GroupName>{item.name}</GroupName>
          <GroupAdvisor>{item.advisorName}</GroupAdvisor>
        </GroupTextContainer>
      </Group>
    );
  };

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Controller
          control={control}
          name={'group'}
          render={({ field: { onChange, value } }) => (
            <GroupsList
              nestedScrollEnabled
              data={groupList}
              renderItem={({ item }) => {
                const parsedItem: Group = item as Group;
                return renderGroup({
                  item: parsedItem,
                  onChange,
                  selectedGroup: value,
                });
              }}
            />
          )}
        />
      </Container>
      {/* <Button label={'Cadastre-se'} onPress={handleSubmit(onSubmit)} /> */}
      <Button label={'Cadastre-se'} onPress={handleSubmit(({ group }) => onSubmit(group))} />
    </>
  );
}
