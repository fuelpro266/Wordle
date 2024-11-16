const mqtt = require('mqtt');

// Substitua com o endereço do seu broker MQTT
const brokerUrl = 'mqtt://broker.hivemq.com';

// Opções de conexão
const options = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),  // Gera um ID de cliente único
    clean: true,  // True para iniciar uma nova sessão limpa
    connectTimeout: 4000,  // Tempo limite de conexão em milissegundos
    reconnectPeriod: 1000,  // Tempo de reconexão em milissegundos
};

// Conecte-se ao broker MQTT
const client = mqtt.connect(brokerUrl, options);

// Evento de conexão
client.on('connect', () => {
    console.log('Conectado ao broker MQTT');

    // Substitua 'test/topic' pelo tópico que deseja subscrever
    const topic = 'APKPROG_TOPICO_SUB_PORTAO_SONY';

    client.subscribe(topic, { qos: 1 }, (err) => {
        if (!err) {
            console.log(`Subscreveu ao tópico '${topic}'`);

            // Enviar uma mensagem para o tópico
            const message = 'RL1_1';
            client.publish(topic, message, { qos: 1 }, (err) => {
                if (!err) {
                    console.log(`Mensagem enviada para o tópico '${topic}': ${message}`);
                } else {
                    console.error(`Erro ao enviar mensagem para o tópico: ${err}`);
                }
            });
        } else {
            console.error(`Erro ao subscrever ao tópico: ${err}`);
        }
    });
});

// Evento de mensagem
client.on('message', (topic, message) => {
    // message é um Buffer
    console.log(`Mensagem recebida no tópico '${topic}': ${message.toString()}`);
});

// Evento de erro
client.on('error', (err) => {
    console.error(`Erro de conexão: ${err}`);
    client.end();
});

// Evento de desconexão
client.on('close', () => {
    console.log('Desconectado do broker MQTT');
});
// Evento de mensagem
client.on('message', (topic, message) => {
    // message é um Buffer
    console.log(`Mensagem recebida no tópico '${topic}': ${message.toString()}`);
});

// Evento de erro
client.on('error', (err) => {
    console.error(`Erro de conexão: ${err}`);
    client.end();
});

// Evento de desconexão
client.on('close', () => {
    console.log('Desconectado do broker MQTT');
});