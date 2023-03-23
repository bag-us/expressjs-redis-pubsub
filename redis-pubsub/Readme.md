Using Redis 7

1. docker-compose -f redis/docker/docker-compose.yaml up -d
2. docker logs redis
3. docker container exec -it redis sh
4. redis-cli -h localhost (publisher)
- auth server rahasia
5. redis-cli -h <nama_container_publisher> (subscriber)
- auth client rahasia


PubSub version 1 :
    Menerima data dan menampilkannya ke halaman web, namun perlu refresh 
agar message yang sudah terkirim bisa dilihat.


PubSub version 2 :
    Menerima data dan langsung mengirimkannya melalui email saat message 
diterima.