import {app, connectToDatabase} from "./loaders/index.js"
import baseConfig from "./config/baseConfig.js";

const port = baseConfig.port
const uri = baseConfig.dbUri

connectToDatabase(uri).then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
})

