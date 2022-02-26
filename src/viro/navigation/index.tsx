import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import ARImageMarkerScene from '../scenes/arimage-marker-scene';

const ARNavigation = (props) => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      style={{flex: 1}}
      initialScene={{scene: ARImageMarkerScene, passProps: props}}
      passProps={props}
    />
  );
};

export default ARNavigation;
