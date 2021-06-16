# TODO: Make image smaller
FROM node:14.16.0-alpine3.10 as frontend
WORKDIR /chathuram/client
COPY ./src/client/package.json .
COPY ./src/client/package-lock.json .
RUN npm ci
COPY ./src/client .
RUN npm run build

FROM python:3.8-buster
WORKDIR /chathuram/server
COPY ./src/server/requirements.txt .
RUN pip install -r requirements.txt
COPY ./src/server .
COPY --from=frontend /chathuram/client/build/ ./fe/
EXPOSE 5000
CMD python app.py