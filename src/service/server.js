async function runServer(app) {
  try {
    const port = process.env.SERVER_PORT || 3001;

    await app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Server start error: ${error.message}`);
  }
}

module.exports = runServer;
