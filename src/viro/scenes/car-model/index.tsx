import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroMaterials,
  ViroSpotLight,
  ViroQuad,
  Viro3DObject,
  ViroNode,
  ViroSphere,
  ViroLightingEnvironment,
} from '@viro-community/react-viro';

interface CarModelProps {}

ViroARTrackingTargets.createTargets({
  logo: {
    source: require('./res/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.165, // real world width in meters
  },
});

ViroAnimations.registerAnimations({
  scaleUp: {
    properties: {scaleX: 1, scaleY: 1, scaleZ: 1},
    duration: 500,
    easing: 'bounce',
  },
  scaleDown: {properties: {scaleX: 0, scaleY: 0, scaleZ: 0}, duration: 200},
  scaleCar: {
    properties: {scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09},
    duration: 500,
    easing: 'bounce',
  },
  scaleSphereUp: {
    properties: {scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8},
    duration: 50,
    easing: 'easeineaseout',
  },
  scaleSphereDown: {
    properties: {scaleX: 1, scaleY: 1, scaleZ: 1},
    duration: 50,
    easing: 'easeineaseout',
  },
  tapAnimation: [['scaleSphereUp', 'scaleSphereDown']],
});

ViroMaterials.createMaterials({
  white: {
    lightingModel: 'PBR',
    diffuseTexture: require('./res/tesla/object_car_main_Base_Color.png'),
    metalnessTexture: require('./res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('./res/tesla/object_car_main_Roughness.png'),
  },
  blue: {
    lightingModel: 'PBR',
    diffuseTexture: require('./res/tesla/object_car_main_Base_Color_blue.png'),
    metalnessTexture: require('./res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('./res/tesla/object_car_main_Roughness.png'),
  },
  white_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  blue_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(19,42,143)',
  },
});

const CarModel = (props: CarModelProps) => {
  const [pauseUpdates, setPauseUpdates] = React.useState<Boolean>(false);
  const [animateCar, setAnimateCar] = React.useState<Boolean>(false);
  const [playAnim, setPlayAnim] = React.useState<Boolean>(false);
  const [tapWhite, setTapWhite] = React.useState<Boolean>(false);
  const [tapBlue, setTapBlue] = React.useState<Boolean>(false);
  const [animName, setAnimName] = React.useState<String>('scaleUp');
  const [texture, setTexture] = React.useState<String>('white');

  const _onAnchorFound = useCallback(() => {
    setAnimateCar(true);
  }, []);

  const _toggleButtons = useCallback(() => {
    setAnimName(animName === 'scaleUp' ? 'scaleDown' : 'scaleUp');
    setPlayAnim(true);
  }, [animName]);

  const _selectWhite = useCallback(() => {
    setTexture('white');
    setTapWhite(true);
  }, []);

  const _selectBlue = useCallback(() => {
    setTexture('blue');
    setTapBlue(true);
  }, []);

  const _animateFinished = useCallback(() => {
    setTapWhite(false);
    setTapBlue(false);
  }, []);

  return (
    <ViroARScene>
      <ViroLightingEnvironment source={require('./res/tesla/garage_1k.hdr')} />

      <ViroARImageMarker
        target={'logo'}
        onAnchorFound={_onAnchorFound}
        pauseUpdates={pauseUpdates}>
        <ViroNode
          scale={[0, 0, 0]}
          transformBehaviors={['billboardY']}
          animation={{name: animName, run: playAnim}}>
          <ViroSphere
            materials={['white_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[-0.2, 0.25, 0]}
            onClick={_selectWhite}
            animation={{
              name: 'tapAnimation',
              run: tapWhite,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />

          <ViroSphere
            materials={['blue_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[-0.1, 0.25, 0]}
            onClick={_selectBlue}
            animation={{
              name: 'tapAnimation',
              run: tapBlue,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />
        </ViroNode>

        <Viro3DObject
          scale={[0, 0, 0]}
          source={require('./res/tesla/object_car.obj')}
          resources={[require('./res/tesla/object_car.mtl')]}
          type="OBJ"
          materials={texture}
          onClick={_toggleButtons}
          animation={{name: 'scaleCar', run: animateCar}}
        />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[0, 5, 1]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.7}
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default CarModel;

const styles = StyleSheet.create({
  container: {},
});
