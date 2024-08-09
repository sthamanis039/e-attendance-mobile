import {Button, Dialog, ListItem, Text, makeStyles} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

const useStyles = makeStyles(theme => ({
  container: {},
  labelStyle: {
    color: theme.colors.primary,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainerStyle: {
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.grey5,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors.grey4,
  },
  titleStyle: {
    color: theme.colors.grey3,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '100',
  },
  selectedOptionStyle: {
    backgroundColor: theme.colors.grey5,
  },
  selectedOptionTitleStyle: {
    color: theme.colors.primary,
  },
  errorStyle: {
    color: theme.colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
  },
}));

export default function DropDown({
  label = 'Select',
  placeholder = 'Choose',
  options = [],
  onSelect = null,
  errorMessage = null,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    title: placeholder,
    value: null,
  });
  const styles = useStyles();

  function toggleDialog() {
    setIsVisible(!isVisible);
  }

  function selectOption(option) {
    setSelectedOption(option);
    onSelect && onSelect(option);
    toggleDialog();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Button
        title={selectedOption.title}
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        onPress={toggleDialog}
      />
      <Dialog isVisible={isVisible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={label} titleStyle={styles.titleStyle} />
        <ScrollView>
          {options?.map((option, index) => (
            <ListItem
              key={index}
              onPress={() => selectOption(option)}
              containerStyle={[
                option.value === selectedOption.value &&
                  styles.selectedOptionStyle,
              ]}>
              <ListItem.Title
                style={[
                  option.value === selectedOption.value &&
                    styles.selectedOptionTitleStyle,
                ]}>
                {option?.title}
              </ListItem.Title>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>
      <Text style={styles.errorStyle}>{errorMessage || ''}</Text>
    </View>
  );
}
