import React, { useState, useRef, useEffect, useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import styled from "styled-components/native";
import { Button, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";


const ProfileCamera = styled(Camera)`
    width: 100%;
    height: 100%;
`;

const AskPermissionContainer = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;

const CameraSection = styled.View`
    flex-direction: row;
    position: absolute;
    width: 100%;
    bottom: ${(props) => props.theme.space[3]};
    align-items: center;
    justify-content: center;
`;

export const CameraScreen = ({ navigation }) => {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef();
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
            navigation.goBack();
        }
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <AskPermissionContainer>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </AskPermissionContainer>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }


    return (
        <ProfileCamera
            ref={(camera) => (cameraRef.current = camera)}
            type={type}
        >
            <CameraSection>
                <Button onPress={snap} title="TAKE A SNAP"></Button>
                <Button onPress={toggleCameraType} title="Flip Camera"></Button>
            </CameraSection>
        </ProfileCamera>
    );
};

