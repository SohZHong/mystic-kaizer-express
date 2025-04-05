function generateLobbyCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    code += chars[randIndex];
  }
  return code;
}

export default generateLobbyCode;
