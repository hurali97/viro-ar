import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import ARNavigation from '../../../viro/navigation';
import ARImageMarkerScene from '../../../viro/scenes/arimage-marker-scene';
import ARPlaneScene from '../../../viro/scenes/arplane-scene';

interface ARPlaneScreenProps {}

const ARPlaneScreen = (props: ARPlaneScreenProps) => {
  let arNavigation;

  const setARNavigation = navigationRef => {
    arNavigation = navigationRef;
  };

  const onScene_1 = () => {
    console.log('arNavigation ', arNavigation);
    arNavigation?.replace({
      scene: ARImageMarkerScene,
      passProps: getARNavProps(),
    });
  };

  const onScene_2 = () => {
    console.log('arNavigation ', arNavigation);
    arNavigation?.replace({
      scene: ARPlaneScene,
      passProps: getARNavProps(),
    });
  };

  const getARNavProps = () => {
    return {
      setARNavigation: setARNavigation,
    };
  };

  return (
    <View style={styles.container}>
      {ARNavigation(getARNavProps())}
      <View style={styles.sceneContainer}>
        <TouchableOpacity onPress={onScene_1} style={styles.scene1_btn}>
          <Text style={styles.btnText}>AR Image Marker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onScene_2} style={styles.scene2_btn}>
          <Text style={styles.btnText}>AR Plane</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ARPlaneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  scene1_btn: {
    padding: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  scene2_btn: {
    padding: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  btnText: {
    color: '#000',
  },
});
