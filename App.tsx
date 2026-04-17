import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Consulta = {
  paciente: string;
  medico: string;
  status: "pendente" | "confirmada" | "cancelada";
};

const STORAGE_KEY = "@consultas:consulta_atual";

export default function App() {
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);

  //CARREGAR AO ABRIR APP
  useEffect(() => {
    async function loadData() {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data) {
          setConsulta(JSON.parse(data));
        } else {
          const inicial: Consulta = {
            paciente: "João Silva",
            medico: "Dra. Ana Souza",
            status: "pendente",
          };

          setConsulta(inicial);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
        }
      } catch (error) {
        console.log("Erro ao carregar:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  //SALVAR AUTOMATICAMENTE
  async function salvar(novaConsulta: Consulta) {
    setConsulta(novaConsulta);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaConsulta));
  }

  //CONFIRMAR
  function confirmar() {
    if (!consulta) return;

    salvar({
      ...consulta,
      status: "confirmada",
    });
  }

  //CANCELAR
  function cancelar() {
    if (!consulta) return;

    salvar({
      ...consulta,
      status: "cancelada",
    });
  }

  //LOADING
  if (loading || !consulta) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando consulta...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
        Consulta Médica
      </Text>

      <Text style={{ fontSize: 18, color: "#000" }}>
        Paciente: {consulta.paciente}
      </Text>

      <Text style={{ fontSize: 18, color: "#000" }}>
        Médico: {consulta.medico}
      </Text>

      <Text style={{ fontSize: 18, color: "#000" }}>
        Status: {consulta.status}
      </Text>

      <TouchableOpacity
        onPress={confirmar}
        style={{
          backgroundColor: "green",
          padding: 12,
          borderRadius: 8,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Confirmar Consulta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={cancelar}
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Cancelar Consulta
        </Text>
      </TouchableOpacity>
    </View>
  );
}