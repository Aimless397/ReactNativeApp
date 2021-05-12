import React, { useContext, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { HeaderTitle } from '../components/HeaderTitle'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const PullToRefreshScreen = () => {

  const { top } = useSafeAreaInsets();

  const { theme: { colors, dividerColor, dark } } = useContext(ThemeContext);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<string>();

  const onRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      console.log(`Terminamos`);
      setIsRefreshing(false);
      setData('Hola mundo');
    }, 3500);
  }

  return (

    <ScrollView
      style={{
        marginTop: isRefreshing ? top : 0
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          progressViewOffset={10}
          progressBackgroundColor={dividerColor}
          colors={[colors.text]}    /* colors={['white', 'red', 'orange']} */   // ANDROID
          style={{ backgroundColor: '#5856D6' }}    // IOS
          tintColor={ dark ? "white" : 'black'}   // IOS
          title="Refreshing"   // IOS
          titleColor="white"   // IOS
        />
      }
    >
      <View style={styles.globalMargin}>
        <HeaderTitle title="Pull to refresh" />

        {
          (data) && <HeaderTitle title={data} />
        }
      </View>
    </ScrollView>
  )
}
