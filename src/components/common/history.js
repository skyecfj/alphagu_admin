const createHistory = require("history").createHashHistory

const history = createHistory()

global.constants = {
    history:history
}

export default history