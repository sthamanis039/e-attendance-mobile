import {useRoute} from '@react-navigation/native';
import {Icon, ListItem, useTheme} from '@rneui/themed';
import {useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {getActivityById, getMyActivity} from '../api';
import Header from '../components/Header';

export default function ActivityLog() {
  const {params} = useRoute();

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['activities', ...(params?.studentId ? [params?.studentId] : [])],
    queryFn: params?.studentId
      ? getActivityById(
          params?.studentId,
          {
            limit: 10,
            page: 1,
          },
          d => d?.data?.data?.days,
        )
      : getMyActivity(
          {
            limit: 10,
            page: 1,
          },
          d => d?.data?.data?.days,
        ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  console.log(data);

  return (
    <View style={{flex: 1}}>
      <Header title={params?.title || 'My Activity'} />
      <FlatList
        contentContainerStyle={{padding: 8}}
        data={data?.pages?.flat()}
        renderItem={({item}) => <ActivityItem data={item} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={isFetchingNextPage}
        onRefresh={fetchNextPage}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
}

function ActivityItem({data}) {
  const {theme} = useTheme();
  return (
    <ListItem
      style={{
        marginBottom: 8,
        borderLeftWidth: 8,
        borderRadius: 8,
        borderLeftColor:
          data?.status === 'A'
            ? theme.colors.tertiaryShades[500]
            : theme.colors.primary,
        borderRightWidth: 8,
        borderRightColor: theme.colors.white,
      }}>
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 16, fontWeight: 'bold'}}>
          {data?.date}
        </ListItem.Title>
        {data?.status === 'A' ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
              flexGrow: 1,
            }}>
            <View
              style={{
                backgroundColor: theme.colors.tertiaryShades[100],
                padding: 8,
                borderRadius: 4,
                marginVertical: 8,
              }}>
              <Icon name="close" type="antdesign" size={14} />
            </View>
            <ListItem.Subtitle>Absent</ListItem.Subtitle>
          </View>
        ) : (
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
              <ListItem.Subtitle>
                {data?.checkin?.split(' ')[1]}
              </ListItem.Subtitle>
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
              <ListItem.Subtitle>
                {data?.checkout?.split(' ')[1]}
              </ListItem.Subtitle>
            </View>
          </View>
        )}
      </ListItem.Content>
    </ListItem>
  );
}
