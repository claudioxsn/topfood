import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Footer from '../components/Footer';
import Head from '../components/Header';
import { useNavigation } from '@react-navigation/native';

async function listarProdutos(): Promise<Produto[]> {
    try {
        const response = await axios.get<Produto[]>('http://10.137.3.65:8000/api/produtos');
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function PesquisaProdutos(): React.JSX.Element {

    const navigation = useNavigation();

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const selecionarProduto = (produto: Produto) => {
        navigation.navigate('EditarProduto', { produto });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosData = await listarProdutos();
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: Produto }) => {
        // Formata o preço usando Intl.NumberFormat
        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.preco);

        return (
            <TouchableOpacity style={styles.menuItem} onPress={() => selecionarProduto(item)}>
                <Image source={item.imagem ? { uri: item.imagem } : require('../assets/images/hamburger.png')} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item.nome}</Text>
                    <Text style={styles.description}>{item.ingredientes}</Text>
                    <Text style={styles.price}>Preço: {precoFormatado}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="red" barStyle="light-content" />
            <Head />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={produtos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                contentContainerStyle={styles.menuList}
            />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 10
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    menuList: {
        flexGrow: 1,
    },
});

export default PesquisaProdutos;
