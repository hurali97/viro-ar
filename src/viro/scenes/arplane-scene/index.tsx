import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';

interface ARPlaneSceneProps {}

const ARPlaneScene = (props: ARPlaneSceneProps) => {
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

export default ARPlaneScene;

const styles = StyleSheet.create({
  container: {},
});
