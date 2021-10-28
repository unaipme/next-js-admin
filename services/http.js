const protocol = process.env.PROTOCOL || "http"
const backend = process.env.BACKEND_URL;

const http = (entity) => {
    const base = `${protocol}://${backend}/api`;
    return {
        getEntity: () => fetch(`${base}/${entity}`),
        getEntityInstanceById: (id) => fetch(`${base}/${entity}/${id}`),
        updateEntityInstanceById: (id, body) => fetch(`${base}/${entity}/${id}`, {
            method: "PUT", body
        })
    }
};

export default http;