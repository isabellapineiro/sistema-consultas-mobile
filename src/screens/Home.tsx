import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

type Paciente = {
  nome: string;
};

type Medico = {
  nome: string;
};

type Consulta = {
  paciente: Paciente;
  medico: Medico;
};

export default function Home() {
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsulta() {
      try {
        const response = await new Promise<Consulta>((resolve) =>
          setTimeout(() => {
            resolve({
              paciente: { nome: "João Silva" },
              medico: { nome: "Dra. Ana Souza" },
            });
          }, 1000)
        );

        setConsulta(response);
      } catch (error) {
        console.log("Erro ao carregar consulta:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarConsulta();
  }, []);
  
  const paciente = consulta?.paciente;
  const medico = consulta?.medico;

  if (loading || !paciente || !medico) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Paciente: {paciente.nome}</Text>
      <Text style={{ fontSize: 20 }}>Médico: {medico.nome}</Text>
    </View>
  );
}