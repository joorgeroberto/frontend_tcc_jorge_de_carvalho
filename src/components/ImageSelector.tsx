import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Controller } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import colors from '@config/colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
  name: string;
  control: any;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export function ImageSelector({ name, width, height, borderRadius, control }: Props) {
  const getImage = async () => {
    try {
      const { assets } = await launchImageLibrary({
        maxWidth: 1920,
        maxHeight: 1080,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      });

      const isValidImage = assets && assets?.length > 0;
      if (isValidImage) {
        const image = assets?.[0];

        console.log('image', image);

        // data.append(name, {
        //   name: image.fileName,
        //   type: image.type,
        //   uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        //   // uri: image.uri,
        // });

        return {
          multipartFormName: name,
          fileName: image.fileName,
          type: image.type,
          uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        };
        // return assets?.[0].uri as string;
      }
    } catch (error) {
      return '';
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <ImageContainer onPress={async () => onChange(await getImage())}>
            <Image
              width={width}
              height={height}
              borderRadius={borderRadius}
              resizeMode="cover"
              source={{ uri: value.uri }}
            />
            {error && error?.message && <StyledTextError>{error?.message}</StyledTextError>}
          </ImageContainer>
        );
      }}
    />
  );
}

interface ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const Image = styled.Image<ImageProps>`
  width: ${({ width }) => (width ? width : windowWidth * 0.453)}px;
  height: ${({ height }) => (height ? height : windowWidth * 0.453)}px;
  background-color: ${colors.GRAY1};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 500)}px;
`;

export const StyledTextError = styled.Text`
  max-width: ${windowWidth * 0.6};
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  margin-top: 5px;
  color: ${colors.RED};
`;
