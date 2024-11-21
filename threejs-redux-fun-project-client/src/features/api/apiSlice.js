import { createApi } from '@reduxjs/toolkit/query/react';

// Initialize WebSocket connection
const ws = new WebSocket(
  process.env.REACT_APP_BACKEND_URL || 'ws://localhost:5001'
);

const websocketBaseQuery =
  () =>
  async ({ body }) => {
    // Ensure WebSocket is open before sending a message
    if (ws.readyState !== WebSocket.OPEN) {
      return { error: { status: 'WebSocket is not ready' } };
    }

    return new Promise((resolve) => {
      // Listen for messages from the WebSocket server
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        resolve({ data: response.result });
      };

      // Send JSON-RPC formatted message to the WebSocket server
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          ...body,
          id: Date.now(), // Unique request ID
        })
      );
    });
  };

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: websocketBaseQuery(),
  endpoints: (builder) => ({
    getCount: builder.query({
      query: () => ({
        body: { method: 'get_value', params: {} },
      }),
    }),
    sendCount: builder.mutation({
      query: (method) => ({
        body: { method, params: {} },
      }),
    }),
    setRadius: builder.mutation({
      query: (radius) => ({
        body: { method: 'set_radius', params: { radius } },
      }),
    }),
    getRadius: builder.query({
      query: () => ({
        body: { method: 'get_radius', params: {} },
      }),
    }),
  }),
});

export const {
  useSendCountMutation,
  useGetCountQuery,
  useSetRadiusMutation,
  useGetRadiusQuery,
} = counterApi;
