import pluralize from "pluralize";

const protocol = process.env.PROTOCOL || "http"
const backend = process.env.BACKEND_URL;

const http = (entity) => {
    const base = `${protocol}://${backend}/api`;
    const _entity = pluralize(entity);
    return {
        getEntity: () => fetch(`${base}/${_entity}`),
        getEntityInstanceById: (id) => fetch(`${base}/${_entity}/${id}`),
        updateEntityInstanceById: (id, body) => fetch(`${base}/${_entity}/${id}`, {
            method: "PUT", body
        }),
        deleteEntityInstanceById: (id) => fetch(`${base}/${_entity}/${id}`, { method: "DELETE" }),
        createEntityInstance: (body) => fetch(`${base}/${_entity}`, {
            method: "POST", body
        })
    }
};

export default http;