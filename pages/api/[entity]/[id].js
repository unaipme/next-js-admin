import http from "../../../services/http";

export default function handler(req, res) {
    const { method, query: { entity, id }, body } = req;
    const client = http(entity);
    if (method === "PUT") {
        client.updateEntityInstanceById(id, body)
            .then(() => res.status(200))
            .catch(() => res.status(500));
    } else if (method === "DELETE") {
        client.deleteEntityInstanceById(id)
            .then(() => res.status(204))
            .catch(() => res.status(500));
    } else {
        res.status(405);
    }
}