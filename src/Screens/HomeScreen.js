import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/fundo.png')}
      style={styles.container}
      imageStyle={styles.imagem}
    >
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Bem-vindo à sua lista de compras</Text>
        <Button title="Ir para Carrinho" color='#A57008' onPress={() => navigation.navigate('Produtos')} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    resizeMode: 'cover',
  },
  conteudo: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1C3426',
    borderRadius: 12,
  },
titulo: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 12 ,
    color: '#fff',
}



});

export default HomeScreen;
