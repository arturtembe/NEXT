
const host = `http://localhost:3333/mongodb/andarilo/agenda`;

const endpoint = {
    add: `${host}/create`,
    edit: `${host}/edit`,
    view: `${host}/view`,
    delete: `${host}/delete`,
}

export default endpoint;