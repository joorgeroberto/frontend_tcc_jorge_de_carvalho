import React from 'react';
import {
  Container,
  GroupsList,
  GroupImage,
  Group,
  Button,
  ButtonContainer,
  GroupTextContainer,
  GroupName,
  GroupAdvisor,
} from '../styles/SelectGroup.styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  group_id: string;
  onPress: (data: string) => void;
}

interface Group {
  id: string;
  name: string;
  advisor: string;
  image: string;
}

interface RenderGroupProps {
  item: Group;
  selectedGroupId: string;
  onChange: (id: string) => void;
}

const groupList: Array<Group> = [
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a2',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a3',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a4',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a5',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a6',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a7',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a8',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a9',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
  {
    id: '277fbb62-fc83-49e0-8a8f-b80603aec91a10',
    name: 'Clube de corrida da Ufs',
    advisor: 'Assessor da Silva',
    image: 'https://infonet.com.br/wp-content/uploads/2020/09/ufs_fotoascom_100920.jpg',
  },
];

export function SelectGroup({ group_id, onPress }: Props) {
  const validationSchema = yup.object().shape({
    group_id: yup.string().required('Selecione um grupo.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      group_id,
    },
  });

  const onSubmit = (info: any) => onPress(info.group_id);

  const renderGroup = ({ item, onChange, selectedGroupId }: RenderGroupProps) => {
    const isSelected = item.id === selectedGroupId;
    return (
      <Group isSelected={isSelected} onPress={() => onChange(item.id)}>
        <GroupImage source={{ uri: item.image }} />
        <GroupTextContainer>
          <GroupName>{item.name}</GroupName>
          <GroupAdvisor>{item.advisor}</GroupAdvisor>
        </GroupTextContainer>
      </Group>
    );
  };

  return (
    <>
      <Container>
        <Controller
          control={control}
          name={'group_id'}
          render={({ field: { onChange, value } }) => {
            return (
              <GroupsList
                nestedScrollEnabled
                data={groupList}
                renderItem={({ item }) => {
                  const parsedItem: Group = item as Group;
                  return renderGroup({ item: parsedItem, onChange, selectedGroupId: value });
                }}
              />
            );
          }}
        />
      </Container>
      <Button label={'Cadastre-se'} onPress={handleSubmit(onSubmit)} />
    </>
  );
}
