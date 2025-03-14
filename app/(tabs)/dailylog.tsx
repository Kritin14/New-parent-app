import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { supabase } from '../../supabase';
import { useUser } from '../UserContext'; // Import useUser

const profile = require('../../assets/images/vecteezy_ai-generated-beautiful-young-primary-school-teacher-at_32330362 (1).jpg');
const feedingImage = require('../../assets/images/breastfeeding-vector.png');
const sleepImage = require('../../assets/images/sleep.png'); 
const nappyImage = require('../../assets/images/nappy1.png');
const growthImage = require('../../assets/images/growth1.png'); 
const healthImage = require('../../assets/images/health.png');

export default function Tab() {
  const router = useRouter();
  const { user } = useUser(); // Get the logged-in user
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('Profiles')
          .select('name')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Error fetching user name:', error);
        } else {
          setUserName(data.name);
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <ScreenWrapper bg='white'>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Daily Logs</Text>
          
        </View>

        <View style={styles.flexContainer}>
          <LinearGradient colors={['#FFFFFF', '#CBE6F9']} style={styles.imageBox}>
            <Text style={styles.imageText}>Feeding</Text>
            <TouchableOpacity onPress={() => router.push('/dialogs/feeding' as any)}>
              <Image source={feedingImage} style={styles.iconImage}/>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#FFFFFF', '#CBE6F9']} style={styles.imageBox}>
            <Text style={styles.imageText}>Sleep</Text>
            <TouchableOpacity onPress={() => router.push('/dialogs/sleeping' as any)}>
              <Image source={sleepImage} style={styles.iconImage}/>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#FFFFFF', '#CBE6F9']} style={styles.imageBox}>
            <Text style={styles.imageText}>Nappy</Text>
            <TouchableOpacity onPress={() => router.push('/dialogs/nappy' as any)}>
              <Image source={nappyImage} style={styles.iconImage}/>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#FFFFFF', '#CBE6F9']} style={styles.imageBox}>
            <Text style={styles.imageText}>Growth</Text>
            <TouchableOpacity onPress={() => router.push('/dialogs/growth' as any)}>
              <Image source={growthImage} style={styles.iconImage}/>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#FFFFFF', '#CBE6F9']} style={styles.imageBox}>
            <Text style={styles.imageText}>Health</Text>
            <TouchableOpacity onPress={() => router.push('/dialogs/health' as any)}>
              <Image source={healthImage} style={styles.iconImage}/>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%', 
  },
  imageText: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black', 
  },
  iconImage: {
    marginTop: 30,
    width: 200,
    height: 100,
    resizeMode: 'center',
  },
});