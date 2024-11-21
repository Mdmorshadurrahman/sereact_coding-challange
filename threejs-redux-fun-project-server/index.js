const WebSocket = require('ws');
const { JSONRPCServer } = require('json-rpc-2.0');

const server = new JSONRPCServer();

// State variables
let currentValue = 0;
let sphereRadius = 5;

// Define JSON-RPC methods
server.addMethod('increment', () => {
  currentValue += 1;
  return currentValue;
});

server.addMethod('decrement', () => {
  currentValue -= 1;
  return currentValue;
});

server.addMethod('get_value', () => currentValue);

server.addMethod('set_radius', ({ radius }) => {
  sphereRadius = radius;
  return sphereRadius;
});

server.addMethod('get_radius', () => sphereRadius);

// Create WebSocket Server
const wss = new WebSocket.Server({ port: 5001 }); // WebSocket on port 5001

wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');

  ws.on('message', async (message) => {
    try {
      const jsonRPCRequest = JSON.parse(message);
      const jsonRPCResponse = await server.receive(jsonRPCRequest);

      if (jsonRPCResponse) {
        ws.send(JSON.stringify(jsonRPCResponse));
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:5001');
