export default function handler(req, res) {
    const { method, query: { entity, id }, body } = req;
    if (method === "PUT") {
        console.log(`Updating ${entity} with id ${id}`, body);
        fetch(`http://${process.env.BACKEND_URL}/api/${entity}/${id}`, {
            method: "PUT", body
        })
        .then(() => res.status(200))
        .catch(() => res.status(500))
    } else if (method === "POST") {
        res.status(501);
    } else {
        res.status(405);
    }
    res.status(200).json({ name: "John Doe" });
}