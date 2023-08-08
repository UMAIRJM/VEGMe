import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const GetStarted = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  
  const navigation = useNavigation()
  // Replace these image URIs with the paths to your images
  const images = [
    require('./assets/Vegetable1.png'),
    require('./assets/vegetable2.png'),
    require('./assets/vegetable3.png'),
    // Add more images as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextPage();
    }, 3000); // Change the interval time here (e.g., 5000ms = 5 seconds)

    return () => clearInterval(interval);
  }, [currentPage]);

  const goToNextPage = () => {
    if (pagerRef.current) {
      let nextPageIndex = currentPage + 1;
      if (nextPageIndex >= images.length) {
        nextPageIndex = 0; // Loop back to the first page
      }
      pagerRef.current.setPage(nextPageIndex);
      setCurrentPage(nextPageIndex);
    }
  };

  const goToPage = (pageIndex) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageIndex);
      setCurrentPage(pageIndex);
    }
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.dot, index === currentPage ? styles.activeDot : null]}
        onPress={() => goToPage(index)}
      />
    ));
  };
  const buttonHandler=()=>{
    navigation.replace('Signin')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pagerView}>
        <PagerView
          ref={pagerRef}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}
        >
          {images.map((image, index) => (
            <View style={styles.page} key={index}>
              <Image source={image} style={styles.Image} />
            </View>
          ))}
        </PagerView>
      </View>

      <View style={styles.dotContainer}>{renderDots()}</View>
      <View style={{flex:0.15}}>
      <TouchableOpacity style={styles.button} onPress={buttonHandler}>
        <Text style={{fontSize:22,color:'#ffffff'}}>Get Started</Text>
      </TouchableOpacity>

      </View>
     
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pagerView: {
    flex: 0.85,
    
    overflow: 'hidden',
    marginTop: 40,
    borderRadius:20
  },
  viewPager: {
    marginLeft: 0,
    width: '100%',
    flex: 1,
    height: '100%',
  },
  page: {
    flex: 1,
  },
  Image: {
    resizeMode: 'cover',
    height: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue',
  },

  button:{
    
    width:"100%",
    height:50,
    borderWidth:0.7,
    marginTop:20,
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'#000000',
    padding:10
    
}

});
