FROM nginx:alpine

# Copy the static website files to the correct nginx directory
COPY . /usr/share/nginx/html/

# Expose port 80 for Google Cloud Run (Cloud Run expects apps to listen on port 8080 by default, 
# but nginx defaults to 80. We can map it, but it's easier to explicitly set nginx to use 8080 if needed,
# or Cloud Run will handle port 80 if we specify it. Let's use the default nginx port 80 and let Cloud Run route to it).
# However, to be perfectly safe with Cloud Run's default PORT=8080 environment variable, we can override the nginx port:
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
