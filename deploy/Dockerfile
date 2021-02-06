FROM alpine

RUN wget "https://caddyserver.com/api/download?os=linux&arch=amd64&idempotency=41028871869336" --output-document caddy && \
	chmod +x caddy

RUN find . -type f -executable -print0 | xargs -0 chmod og= && \
	chmod o+x /caddy && \
	addgroup -S caddy && \
	adduser -SDh /var/lib/caddy -G caddy caddy

USER caddy:caddy
ADD dist srv
ADD Caddyfile Caddyfile

EXPOSE 8080/tcp
CMD ["/caddy", "run", "--config", "Caddyfile"]
