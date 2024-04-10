FROM nginx
WORKDIR /usr/share/nginx/html
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone
RUN rm -rf ./*
COPY ./dist .
EXPOSE 80