import * as mqtt from 'mqtt'

const mqttBrokerURL: string = 'mqtt://localhost'

const mqttClient: mqtt.MqttClient = mqtt.connect(mqttBrokerURL)

mqttClient.on('connect', () => {
  console.log('terhubung')
})

mqttClient.on('error', (error: any) => {
  console.log(`kelalahan mqtt : ${error}`)
})

export { mqttClient }
