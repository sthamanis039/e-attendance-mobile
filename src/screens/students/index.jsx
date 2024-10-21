import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, Icon, ListItem, SearchBar, useTheme} from '@rneui/themed';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Linking, View} from 'react-native';
import {getStudents} from '../../api';
import Header from '../../components/Header';

export default function Students() {
  const {params} = useRoute();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {data, fetchNextPage, isFetchingNextPage, isFetching, refetch} =
    useInfiniteQuery({
      queryKey: ['activities', search],
      queryFn: getStudents(
        {
          limit: 10,
          page: 1,
          noPagination: false,
          name: search,
        },
        d => d?.data?.data?.results,
      ),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length < 10) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    navigation.addListener('focus', () => refetch());
  }, [navigation, refetch]);

  return (
    <View style={{flex: 1}}>
      <Header title={params?.title || 'Students'} />
      <SearchBar
        placeholder="Search Student Here..."
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <FlatList
        contentContainerStyle={{padding: 8}}
        data={data?.pages?.flat()}
        renderItem={({item}) => <StudentItem data={item} />}
        keyExtractor={item => item?.id}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() =>
          isFetching && <ActivityIndicator size="large" />
        }
        refreshing={isFetchingNextPage}
        onRefresh={refetch}
      />
    </View>
  );
}

function StudentItem({data}) {
  const {theme} = useTheme();
  const navigation = useNavigation();
  return (
    <ListItem
      style={{
        marginBottom: 8,
        borderLeftWidth: 8,
        borderLeftColor:
          data?.isPresent > 0 ? theme.colors.success : theme.colors.error,
        borderRightWidth: 8,
        borderRightColor: theme.colors.white,
        borderRadius: 8,
      }}
      onPress={() =>
        navigation.navigate('ActivityLog', {
          studentId: data?.id,
          title:
            data?.first_name +
            ' ' +
            data?.last_name +
            ' - Roll No.: ' +
            data?.roll_no,
        })
      }>
      <Avatar
        size={40}
        rounded
        title={data?.first_name?.charAt(0) + data?.last_name?.charAt(0) || ''}
        containerStyle={{backgroundColor: theme.colors.primary}}
      />
      <ListItem.Content>
        <ListItem.Title>
          {data?.first_name + ' ' + data?.last_name}
        </ListItem.Title>
        <ListItem.Subtitle>{data?.roll_no}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        reverse
        size={16}
        name="phone"
        color={theme.colors.secondary}
        onPress={() => Linking.openURL(`tel:${data?.phone}`)}
      />
    </ListItem>
  );
}
