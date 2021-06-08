# TODO: Make image smaller
FROM python:3.8-buster
WORKDIR /chathuram/server
COPY ./src/server/requirements.txt .
RUN pip install -r requirements.txt
COPY ./src/server .
EXPOSE 5000
CMD python app.py