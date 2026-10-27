FROM python:alpine3.24
WORKDIR /app/
COPY . .
EXPOSE 8080

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 

RUN pip install -r requirements.txt
RUN python3 manage.py migrate
RUN python3 manage.py collectstatic --noinput

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "cyber.wsgi:application"]