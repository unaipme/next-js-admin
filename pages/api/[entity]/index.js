import http from "../../../services/http";

export default function handler(req, res) {
    const { method, query: { entity, id }, body } = req;
    const client = http(entity);
    if (method === "POST") {
        client.createEntityInstance(body)
            .then(() => res.status(201))
            .catch(() => res.status(500));
    } else {
        res.status(405);
    }
    res.status(200).json({ name: "John Doe" });
}