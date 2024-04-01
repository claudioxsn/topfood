import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Footer from '../components/Footer';


const CadastroProduto: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nome, setNome] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [ingredientes, setIngredientes] = useState<string>('');
    const [imagem, setImagem] = useState<any>('');
    const [loading, setLoading] = useState(false);

    const cadastrarProduto = async () => {
        try {

            setLoading(true);
            // Criar um objeto FormData
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('preco', preco);
            formData.append('ingredientes', ingredientes);
            formData.append('imagem', {
                uri: imagem, // Caminho para a imagem
                type: 'image/jpeg', // Tipo da imagem (pode variar dependendo do tipo de arquivo)
                name: new Date() + '.jpg' // Nome da imagem
            });


            // Fazer a requisição POST com Axios
            const response = await axios.post('http://192.168.1.23:8000/api/produtos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Se a requisição for bem-sucedida, adicione o novo produto à lista
            setProdutos([...produtos, response.data]);
            // Limpar os campos
            setNome('');
            setPreco('');
            setIngredientes('');
            setImagem('');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        } finally {
            setLoading(false);
        }
    };


    const abrirCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imageUri);
                console.log(imageUri);
            }
        });
    }

    const selecionarImagem = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imageUri);
            }
        });
    };

    const renderItem = ({ item }: { item: Produto }) => (
        <TouchableOpacity style={styles.menuItem}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.description}>{item.ingredientes}</Text>
                <Text style={styles.price}>Preço: R$ {item.preco}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="red" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Top Food</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Produto"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    value={preco}
                    onChangeText={setPreco}
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Ingredientes"
                    value={ingredientes}
                    onChangeText={setIngredientes}
                    multiline
                />
                <View style={styles.alinhamentoImagemSelecionada}>
                    {imagem ? <Image source={{ uri: imagem }} style={styles.imagemSelecionada} /> : null}
                </View>
                <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
                    <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={abrirCamera}>
                    <Text style={styles.imageButtonText}>Tirar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
                    <Text style={styles.buttonText}>Cadastrar Produto</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menuList}></View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'red',
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    imageButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagemSelecionada: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    alinhamentoImagemSelecionada: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
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
    footer: {
        borderTopWidth: 0.2,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    footerIcon: {
        width: 30,
        height: 30,
    },
});

export default CadastroProduto;
