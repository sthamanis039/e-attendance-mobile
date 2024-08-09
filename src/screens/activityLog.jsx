import {Icon, ListItem, useTheme} from '@rneui/themed';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from '../components/Header';

export default function ActivityLog() {
  const {theme} = useTheme();
  return (
    <View style={{flex: 1}}>
      <Header title="John Doe" />
      <ScrollView>
        <View style={{padding: 8}}>
          {Array.from({length: 10}).map((_, i) => (
            <ListItem
              key={i}
              style={{
                marginBottom: 8,
                borderLeftWidth: 8,
                borderRadius: 8,
                borderLeftColor: theme.colors.primary,
                borderRightWidth: 8,
                borderRightColor: theme.colors.white,
              }}>
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 16, fontWeight: 'bold'}}>
                  2081/04/27
                </ListItem.Title>
                <View style={{flexDirection: 'row', paddingVertical: 8}}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 8,
                      flexGrow: 1,
                    }}>
                    <View
                      style={{
                        backgroundColor: theme.colors.primaryShades[100],
                        padding: 8,
                        borderRadius: 4,
                      }}>
                      <Icon name="login" type="antdesign" size={14} />
                    </View>
                    <ListItem.Subtitle>09:00 AM</ListItem.Subtitle>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 8,
                      flexGrow: 1,
                    }}>
                    <View
                      style={{
                        backgroundColor: theme.colors.primaryShades[100],
                        padding: 8,
                        borderRadius: 4,
                      }}>
                      <Icon name="logout" type="antdesign" size={14} />
                    </View>
                    <ListItem.Subtitle>06:00 PM</ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
