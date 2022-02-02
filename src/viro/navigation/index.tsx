import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import CarModel from '../scenes/car-model';

const ARNavigation = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      style={{flex: 1}}
      initialScene={{scene: CarModel}}
    />
  );
};

export default ARNavigation;
