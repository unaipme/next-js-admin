# Frontend con Server-side Rendering (SSR)

## Crear la imagen

```bash
docker build -t demo/frontend .
```

## Lanzar el frontend en Docker

```bash
docker run -d \
           --name frontend \
           -p 3000:3000 \
           -e BACKEND_URL=demo-backend \
           --network demo \
           frontend
```

## Lanzar el frontend en Kubernetes

TBD