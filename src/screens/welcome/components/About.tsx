import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleSuggestEmail} from '../../../utils/helpers';

import application from '../../../../package.json';

export const About = () => {
  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <Text style={{textAlign: 'center'}}>
        Application développée par Julien Marcesse
      </Text>
      <TouchableOpacity onPress={handleSuggestEmail}>
        <Text style={{textAlign: 'center', color: 'blue'}}>
          Pour toute question / suggestion :{'\n'}julien.marcesse@gmail.com
        </Text>
      </TouchableOpacity>
      <Text style={{color: 'orange', alignSelf: 'center'}}>
        Version de l'appli : {application.name} {application.version}
      </Text>
    </View>
  );
};
