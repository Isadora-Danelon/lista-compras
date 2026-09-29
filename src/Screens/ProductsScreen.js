import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Produto({ produtos, setProdutos }) {
  const formularioVazio = { nome: "", preco: "", estoque: "", categoria: "" };
  const [formulario, setFormulario] = useState({
    nome: "",
    preco: "",
    estoque: "",
    categoria: "",
  });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");

  function alterarCampo(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  }

  function salvarProduto() {
    if (!formulario.nome.trim()) {
      setMensagem("Digite o nome do produto.");
      return;
    }

    const dados = { ...formulario, nome: formulario.nome.trim() };

    setProdutos((lista) => {
      if (produtoEditando) {
        return lista.map((produto) =>
          produto.id === produtoEditando ? { ...produto, ...dados } : produto
        );
      }

      return [...lista, { ...dados, id: Date.now().toString() }];
    });

    setMensagem("");
    cancelarEdicao();
  }

  function editarProduto(produto) {
    setFormulario({
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria,
    });
    setProdutoEditando(produto.id);
  }

  function removerProduto(id) {
    setProdutos((lista) => lista.filter((produto) => produto.id !== id));
    if (produtoEditando === id) cancelarEdicao();
  }

  function cancelarEdicao() {
    setFormulario(formularioVazio);
    setProdutoEditando(null);
    setMensagem("");
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      {/* titulo altera entre enditando e adcionando */}
      <Text style={styles.titulo}>
        {produtoEditando ? "Editar produto" : "Adicionar produto"}
      </Text>

      <View style={styles.linhaTitulo} />

      <Text style={styles.label}>Nome do Produto:</Text>

      <TextInput style={styles.input} placeholder="Digite o nome do produto" value={formulario.nome} onChangeText={(valor) => alterarCampo("nome", valor)} />

      <Text style={styles.label}>Preço:</Text>

      <TextInput style={styles.input} placeholder="Coloque o preço aqui" value={formulario.preco} onChangeText={(valor) => alterarCampo("preco", valor)} keyboardType="decimal-pad" />

      <Text style={styles.label}>Estoque:</Text>

      <TextInput style={styles.input} placeholder="Quantidade em estoque" value={formulario.estoque} onChangeText={(valor) => alterarCampo("estoque", valor)} keyboardType="numeric" />

      <Pressable style={styles.botaoSalvar} onPress={salvarProduto}>
        <Text style={styles.textoBotao}>
          {produtoEditando ? "Atualizar produto" : "Adicionar produto"}
        </Text>
      </Pressable>

      {!!mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}

      {produtoEditando && (
        <Pressable style={styles.botaoCancelar} onPress={cancelarEdicao}>
          <Text style={styles.textoBotaoCancelar}>Cancelar edição</Text>
        </Pressable>
      )}

      <Text style={styles.subtitulo}>Produtos cadastrados</Text>
      {produtos.length > 0 && <View style={styles.tabela}>
        <View style={styles.linha}>
          <Text style={styles.cabecalho}>Nome</Text>
          <Text style={styles.cabecalho}>Preço</Text>
          <Text style={styles.cabecalho}>Estoque</Text>
          <Text style={styles.cabecalho}>Ações</Text>
        </View>

        {produtos.map((produto) => (
          <View style={styles.linha} key={produto.id}>
            <Text style={styles.celula}>{produto.nome}</Text>
            <Text style={styles.celula}>{produto.preco}</Text>
            <Text style={styles.celula}>{produto.estoque}</Text>
            <View style={styles.acoes}>
              <Pressable style={styles.botaoEditar} onPress={() => editarProduto(produto)}>
                <Text style={styles.textoAcao}>Editar</Text>
              </Pressable>
              <Pressable style={styles.botaoRemover} onPress={() => removerProduto(produto.id)}>
                <Text style={styles.textoAcao}>Remover</Text>
              </Pressable>
            </View>
          </View>
          
        ))}
      </View>}
    </ScrollView>
  );
}

// #08323E
// #1C3426
// #A57008
// #644B08
// #F89248
// #A14A2C
// #912316
// #881234
// #4B0311
// #6A370C


const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#F89248",
  },
  titulo: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#4B0311", 
    marginBottom: 16 
  },

  linhaTitulo: { 
    height: 2, 
    backgroundColor: "#1C3426", 
    marginBottom: 20,
  },

  label: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 8, 
    marginTop: 12,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1C3426",
    borderRadius: 6,
    padding: 14,
    fontSize: 16,
  },

  botaoSalvar: {
    backgroundColor: "#4B0311", 
    borderRadius: 6, 
    marginTop: 28, 
    padding: 2, 
  },

  botaoCancelar: { 
    backgroundColor: "#08323E", 
    borderRadius: 6, 
    marginTop: 16, 
    padding: 2,
  },

  textoBotao: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold", 
    padding: 12, 
  },

  textoBotaoCancelar: { 
    color: "#A57008", 
    textAlign: "center", 
    padding: 12, 
  },

  mensagem: { 
    color: "#b00020", 
    marginTop: 8, 
    fontWeight: "bold", 
  },

  subtitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 28, 
    marginBottom: 12,
  },

  tabela: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#6A370C",
    marginTop: 24,
  },

  linha: {
    backgroundColor: '#1C3426',
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#08323E",
  },

  cabecalho: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    color:'#fff',
  },

  celula: {
    flex: 1,
    padding: 8,
    color:'#fff',
  },

  acoes: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },

  botaoEditar: { 
    backgroundColor: "#A14A2C", 
    borderRadius: 4, 
    padding: 6, 
  },

  botaoRemover: { 
    backgroundColor: "#881234", 
    borderRadius: 4, 
    padding: 6, 
  },
  textoAcao: { 
    color: "#fff", 
    textAlign: "center", 
    fontSize: 12, 
    fontWeight: "bold",
  },


});
