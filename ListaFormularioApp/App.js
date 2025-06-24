import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos los íconos de FontAwesome

export default function App() {
  // Estados para manejar la lista de videojuegos y la entrada del formulario
  const [games, setGames] = useState([]);
  const [gameName, setGameName] = useState('');
  const [score, setScore] = useState(null); // La puntuación ahora es un valor numérico
  const [userName, setUserName] = useState(''); // Nombre de la persona que califica

  // Función para agregar un nuevo videojuego
  const addGame = () => {
    // Validar que ambos campos estén llenos y que la puntuación esté entre 1 y 5
    if (gameName.trim() && score >= 1 && score <= 5 && userName.trim()) {
      const newGame = {
        id: Math.random().toString(), // Usamos un id único
        name: gameName,
        score: score,
        user: userName, // Guardamos el nombre de la persona que da la puntuación
      };
      setGames([...games, newGame]);
      setGameName('');
      setScore(null);
      setUserName(''); // Limpiar el campo de nombre
    } else {
      alert('Por favor, ingresa un nombre válido para el videojuego, un nombre de usuario y una puntuación entre 1 y 5.');
    }
  };

  // Ordenar los juegos de mayor a menor puntuación
  const sortedGames = [...games].sort((a, b) => b.score - a.score);

  return (
    <SafeAreaView style={styles.container}>
      {/* Se usa ScrollView solo para la parte del formulario */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ranking de Videojuegos</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Campo para el nombre del videojuego */}
          <TextInput
            style={styles.input}
            placeholder="Nombre del videojuego"
            value={gameName}
            onChangeText={setGameName}
            placeholderTextColor="#888"
          />

          {/* Campo para el nombre del usuario */}
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#888"
          />

          {/* Selección de puntuación con estrellas */}
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setScore(star)}
                style={styles.starButton}
              >
                <Icon
                  name="star"
                  size={30}
                  color={score >= star ? "#FFD700" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Agregar Videojuego" onPress={addGame} />
        </KeyboardAvoidingView>
      </ScrollView>

      {/* FlatList para los videojuegos */}
      <FlatList
        data={sortedGames}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <View style={styles.gameInfo}>
              <Icon name="gamepad" size={30} color="#4a90e2" style={styles.gameIcon} />
              <Text style={styles.listItemText}>
                {index + 1}. {item.name}
              </Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{item.score}</Text>
              <Icon name="star" size={20} color="#FFD700" />
            </View>
            <Text style={styles.userText}>Calificado por: {item.user}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starButton: {
    marginRight: 5,
  },
  listItem: {
    top: 10,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameIcon: {
    marginRight: 10,
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginRight: 5,
    color: '#333',
  },
  userText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
