import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroMaterials,
  ViroSphere,
  Viro3DObject,
  ViroSpotLight,
  ViroNode,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroParticleEmitter,
  ViroPolyline,
  ViroBox,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';

interface ZombieSceneProps {}

const ZombieScene = (props: ZombieSceneProps) => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroARPlaneSelector>
        <ViroBox
          height={0.4}
          length={0.4}
          width={0.4}
          position={[0, 0.25, 0]}
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default ZombieScene;

const styles = StyleSheet.create({
  container: {},
});
