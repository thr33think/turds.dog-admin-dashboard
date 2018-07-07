FROM andimenge/file-server
COPY dist/ /
EXPOSE 8080
ENTRYPOINT ["/file-server"]