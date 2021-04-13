module.exports = () => {
  if (!process.env.JWT_SIGNATURE) {
    console.error('ERROR TERMINAL: JWT_SIGNATURE no está definida.');
    process.exit(1);
  }
};
