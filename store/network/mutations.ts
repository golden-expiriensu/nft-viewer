export default {
  setNetwork(state: { name: string; uri: string }, values: { name: string, uri: string }) {
    state.name = values.name;
    state.uri = values.uri;
  },
};
