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
  ViroOmniLight,
} from '@viro-community/react-viro';

interface SharkSceneProps {}

ViroARTrackingTargets.createTargets({
  shark: {
    source: require('./res/shark_training.jpeg'),
    orientation: 'Up',
    physicalWidth: 0.3175, // real world width in meters
    type: 'Image',
  },
});

ViroAnimations.registerAnimations({
  scaleShark: {
    properties: {
      scaleX: 0.07,
      scaleY: 0.07,
      scaleZ: 0.07,
    },
    duration: 500,
    easing: 'bounce',
  },
  scaleGoblin: {
    properties: {
      scaleX: 0.001,
      scaleY: 0.001,
      scaleZ: 0.001,
    },
    duration: 500,
    easing: 'bounce',
  },
});

ViroMaterials.createMaterials({
  goblin_mtl: {
    lightingModel: 'PBR',
    normalTexture: require('./res/goblin_normal.png'),
    diffuseTexture: require('./res/goblin_diffuse.png'),
    specularTexture: require('./res/goblin_specular.png'),
  },
  gun_color_mtl: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(19,42,143)',
  },
});

const SharkScene = (props: SharkSceneProps) => {
  const [animateObject, setAnimateObject] = useState(false);
  const [imagePosition, setImagePosition] = useState({x: 0, y: 0, z: 0});

  const _ref = useRef();

  const _onAnchorFound = useCallback(e => {
    setAnimateObject(true);
    setImagePosition({
      x: e.position[0],
      y: e.position[1],
      z: e.position[2],
    });
  }, []);

  const renderGun = useCallback((): JSX.Element => {
    return (
      <Viro3DObject
        ref={_ref}
        position={[imagePosition.x, 0, imagePosition.z]}
        scalePivot={[0, 0, 0]}
        scale={[0, 0, 0]}
        source={require('./res/gun.obj')}
        type="OBJ"
        materials={['gun_color_mtl']}
        animation={{
          name: 'scaleShark',
          run: animateObject,
        }}
      />
    );
  }, [animateObject, imagePosition]);

  const renderGoblin = useCallback((): JSX.Element => {
    return (
      <Viro3DObject
        ref={_ref}
        position={[imagePosition.x, 0, imagePosition.z]}
        scalePivot={[0, 0, 0]}
        scale={[0.001, 0.001, 0.001]}
        source={require('./res/goblin.vrx')}
        type="VRX"
        materials={['goblin_mtl']}
        // animation={{
        //   name: 'scaleGoblin',
        //   run: animateObject,
        //   onFinish: onGoblinShown
        // }}
        animation={{name: 'mixamo.com', run: animateObject, loop: true}}
      />
    );
  }, [animateObject, imagePosition]);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[imagePosition.x, 0, 0]}
      />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[-imagePosition.x, 0, 0]}
      />

      <ViroARImageMarker
        target={'shark'}
        pauseUpdates={true}
        onAnchorFound={_onAnchorFound}>
        {renderGoblin()}
        <ViroParticleEmitter
          position={[imagePosition.x, -0.04, imagePosition.z]}
          duration={2000}
          visible={true}
          delay={0}
          run={true}
          loop={true}
          fixedToEmitter={true}
          image={{
            source: require('./res/particle_fire.png'),
            height: 0.01,
            width: 0.01,
            bloomThreshold: 1.0,
          }}
          spawnBehavior={{
            particleLifetime: [5000, 5000],
            emissionRatePerSecond: [100, 100],
            spawnVolume: {
              shape: 'box',
              params: [0.1, 0.1, 0.1],
              spawnOnSurface: false,
            },
            maxParticles: 2000,
          }}
          particleAppearance={{
            opacity: {
              initialRange: [0, 0],
              factor: 'Time',
              interpolation: [
                {endValue: 1.0, interval: [0, 500]},
                {endValue: 0.0, interval: [4000, 5000]},
              ],
            },
            rotation: {
              initialRange: [0, 360],
              factor: 'Time',
              interpolation: [{endValue: 1080, interval: [0, 5000]}],
            },
            scale: {
              initialRange: [
                [0.5, 0.5, 0.5],
                [0.5, 0.5, 0.5],
              ],
              factor: 'Time',
              interpolation: [
                {endValue: [0.5, 0.5, 0.5], interval: [0, 1000]},
                {endValue: [0.5, 0.5, 0.5], interval: [3000, 5000]},
                {endValue: [0.5, 0.5, 0.5], interval: [4000, 5000]},
              ],
            },
          }}
          particlePhysics={{
            velocity: {
              initialRange: [
                // [0, -0.1, 0],
                [0, imagePosition.y, 0],
                [0, 0, 0],
              ],
            },
          }}
        />
        {/* <ViroNode
          scale={[1, 1, 1]}
        //   transformBehaviors={['billboardY']}
          >
        <ViroBox
         height={0.2}    length={0.2}    width={0.2}  
            materials={['blue_sphere']}
            position={[0.02, imagePosition.y, 0]}
          />

        <ViroBox
       height={0.2}    length={0.2}    width={0.2}  
            materials={['blue_sphere']}
            position={[0.02, -imagePosition.y, 0]}
          />
          </ViroNode> */}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default SharkScene;

const styles = StyleSheet.create({
  container: {},
});
