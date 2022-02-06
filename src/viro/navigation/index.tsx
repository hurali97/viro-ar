import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import CarModel from '../scenes/car-model';
import SharkScene from '../scenes/shark-scene';
import ARPosterDemo from '../scenes/ARPosterDemo/ARPosterDemo';

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
