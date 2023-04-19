import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';

interface SelectProps {
  label: string;
  selected: string;
  setSelected: (value: string) => void;
  options: string[];
}

export function Select({ label, selected, setSelected, options }: SelectProps) {
  return (
    <>
      <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">
        {label}
      </Text>
      <View className="bg-neutral-100 px-5 py-2 rounded-lg h-14 relative">
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
          style={{
            position: 'absolute',
            left: 6,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          mode="dropdown"
        >
          {options.length ? (
            options.map((option, index) => (
              <Picker.Item
                key={`${index}-${option}`}
                label={option}
                value={option}
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#212529',
                }}
              />
            ))
          ) : (
            <Picker.Item label="Nenhuma opção" value="Nenhuma opção" />
          )}
        </Picker>
      </View>
    </>
  );
}
