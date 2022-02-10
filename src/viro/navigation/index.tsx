import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import CarScene from '../scenes/car-scene';
import SharkScene from '../scenes/shark-scene';

const ARNavigation = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      style={{flex: 1}}
      initialScene={{scene: SharkScene}}
    />
  );
};

export default ARNavigation;
