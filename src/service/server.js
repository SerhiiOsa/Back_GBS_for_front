async function runServer(app) {
  try {
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || "0.0.0.0";

    await app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error(`Server start error: ${error.message}`);
  }
}

module.exports = runServer;
