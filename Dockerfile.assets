FROM busybox
MAINTAINER Arnau Siches <arnau@ustwo.com>

COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY etc/nginx/ssl.conf /etc/nginx/ssl.conf
COPY etc/nginx/mime.types /etc/nginx/mime.types
COPY etc/nginx/proxy.conf /etc/nginx/proxy.conf
COPY etc/nginx/locations /etc/nginx/locations
COPY etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY share/nginx /usr/share/nginx

VOLUME /etc/nginx
VOLUME /usr/share/nginx

CMD ["true"]
