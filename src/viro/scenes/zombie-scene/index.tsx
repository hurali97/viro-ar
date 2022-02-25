import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroButton,
} from '@viro-community/react-viro';

interface ZombieSceneProps {}

const ZombieScene = (props: ZombieSceneProps) => {
  useEffect(() => {
    props?.setARNavigation(props?.arSceneNavigator);
  }, []);

  return (
    <ViroARScene anchorDetectionTypes="PlanesVertical">
      <ViroAmbientLight color="#ffffff" />
      <ViroARPlaneSelector alignment="Vertical">
        <Viro3DObject
          position={[0, 0, 0]}
          source={require('./res/Newton.vrx')}
          type="VRX"
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default ZombieScene;

const styles = StyleSheet.create({
  container: {},
});
