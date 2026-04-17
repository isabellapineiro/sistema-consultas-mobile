import { View, Text, Button } from "react-native";
import { styles } from "../styles/consultaCard.styles";
import { Consulta } from "../interfaces/consulta";

type Props = {
  consulta: Consulta;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export function ConsultaCard({ consulta, onConfirmar, onCancelar }: Props) {
  if (!consulta?.paciente || !consulta?.medico) {
  return <Text>Carregando...</Text>;
}

  return (
    <View style={styles.card}>
      <Text>Paciente: {consulta.paciente.nome}</Text>
      <Text>Médico: {consulta.medico.nome}</Text>
      <Text>Status: {consulta.status}</Text>

      <Button title="Confirmar" onPress={onConfirmar} />
      <Button title="Cancelar" onPress={onCancelar} />
    </View>
  );
}