import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import CarScene from '../scenes/car-scene';
import SharkScene from '../scenes/shark-scene';
import ZombieScene from '../scenes/zombie-scene';

const ARNavigation = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      style={{flex: 1}}
      initialScene={{scene: ZombieScene}}
    />
  );
};

export default ARNavigation;
