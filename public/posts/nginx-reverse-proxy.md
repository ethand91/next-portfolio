---
title: "Simple reverse proxy using docker and nginx"
metaTitle: "Simple reverse proxy using docker and nginx"
metaDesc: "Simple reverse proxy using docker and nginx"
socialImage: assets/images/nginx.png
date: "2022-02-03"
tags:
	- nginx
---

## Introduction

Hello! I needed to share a local service that was running in one of my Virtual Machines across my company's VPN. I didn't want to set up the connection inside my virtual machine so for this I used Nginx's reverse proxy. 

---

## Requirements
* Docker
* Docker-Compose

---

First I created the default config file for Nginx:

```bash
# defaults.conf 
server {
  listen [Company VPN IP]];
  server_name [Company VPN IP]];

  location / { 
    include /etc/nginx/includes/proxy.conf;
    proxy_pass [VPN Service Address]]
    allow all;
  }   

  access_log off;
  error_log off;

  charset UTF-8;
}
```

Pretty simple file, I also didn't need any of the log files so I turned them off.

Next I had to create the proxy config file:

```bash
# includes/proxy.conf
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_buffering off;
proxy_request_buffering off;
proxy_http_version 1.1;
```

Finally the docker files!

```bash
# Dockerfile
FROM nginx

COPY ./includes /etc/nginx/includes/
COPY ./default.conf /etc/nginx/conf.d/default.conf
```

```bash
# docker-compose.xml
version: '3' 
services:
  proxy:
    build: ./
    network_mode: 'host'
```

Pretty simple, as I wasn't using anything on port 80 I decided to set the network_mode to "host".

Finally to build and start!

```bash
docker-compose build && docker-compose up -d
```

With this I was able to view the service running on my virtual vachine via the company's VPN connection. :)
